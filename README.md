# Exchange Rate Dashboard - Data Source Information

This document details the configuration, integrations, and architecture of the data sources deployed in the **Exchange Rate Dashboard** application. The dashboard aggregates, processes, and displays foreign exchange rates against the Euro (EUR) from multiple financial endpoints, open APIs, and official central bank interfaces. 

## 1. Primary Data Sources (Standard Currencies)

For standard daily and historical fiat currencies, the application queries highly reliable open financial APIs.

* **Frankfurter API (`api.frankfurter.app` / `api.frankfurter.dev`)**
  * **Usage:** Acts as the primary data source for querying the bulk of historical and daily exchange rates against the Euro.
  * **Origin:** Data is directly modeled after the reference rates published by the European Central Bank (ECB).
* **ExchangeRate-API (`open.er-api.com/v6/latest/EUR`)**
  * **Usage:** Serves as a reliable secondary fetcher to quickly obtain the latest cross-currency rates if precise date-matching requires a fallback.
* **Currency-API CDN (`cdn.jsdelivr.net/npm/@fawazahmed0/currency-api`)**
  * **Usage:** Heavily utilized for obtaining accurate historical "Calibration Data" over specific monthly / daily boundaries. It ensures that the database generation spans accurately through past months without rate limiting issues.

## 2. Central Bank APIs and Scraping (Regional Currencies)

To ensure strict compliance and accuracy for regional currencies, the system connects directly to the official digital portals of respective central banks. Since central banks heavily enforce CORS (Cross-Origin Resource Sharing) restrictions, the app initiates a **sequential fallback proxy mechanism** to guarantee uninterrupted connectivity in the browser environment.

* **Moroccan Dirham (MAD) | Bank Al-Maghrib (BKAM)**
  * **Primary Method:** Directly hits the official JSON API (`api.centralbankofmorocco.ma/cours/Version1/api/CoursBBE`).
  * **Fallback Scheme:** If the official JSON API rejects the request, the application performs dedicated HTML web scraping on the BKAM Website (`bkam.ma/Marches/...`). It scans table elements specifically for "Euro" and mathematically extracts the valid average ("Moyenne") rate.
* **Uzbekistani Som (UZS) | Central Bank of Uzbekistan (CBU)**
  * **Source:** Official CBU JSON API (`cbu.uz/en/arkhiv-kursov-valyut/json/EUR/{date}`).
  * **Strategy:** Reads structured date-based arrays and maps the returned `Rate` attribute natively. 
* **Kazakhstani Tenge (KZT) | National Bank of Kazakhstan (NBK)**
  * **Source:** NBK Official Web Portal (`nationalbank.kz/en/exchangerates/...`).
  * **Strategy:** Employs targeted HTML web-scraping logic. Validates the required string date matches the requested date, scopes into table rows (`<tr>`), filters columns for "EUR" or "Euro", and extracts precise decimal conversions.

## 3. Officially Pegged Currencies

Certain global currencies are strictly pegged to the United States Dollar (USD). The application implements static formulas to maintain mathematical perfection when calculating Euro rates for these markets, eliminating arbitrary market floating errors:

* **United Arab Emirates Dirham (AED):** Pegged firmly at `3.6725`
* **Saudi Riyal (SAR):** Pegged firmly at `3.75`

## 4. Resilient Proxy Fallback Strategy

Because client-side fetch requests to banking domains often fail due to CORS policies, the `fetchUrlWithFallback` methodology iterates sequentially over numerous proxy gateways natively. If one proxy errors or times out, the system routes the payload safely to the next.

**The Priority Chain:**
1. Direct HTTPS execution (Attempted selectively where possible)
2. `https://corsproxy.io/?`
3. `https://api.codetabs.com/v1/proxy?quest=`
4. `https://api.allorigins.win/raw?url=` / `get?url=`
5. `https://thingproxy.freeboard.io/fetch/`

## 5. Built-in Analytics & Verification Engine

The architecture natively checks the validity of incoming rates. It features a specific testing interface (mimicking Python-equivalent live checks) designed to inspect:

* **Verification Status:** Tags if a route is "Live", "Stale", "Proxy", or an "Official Peg".
* **Anomaly Detection:** Flags warnings directly on the UI if a returned currency value breaks normal thresholds, or if Central Banks have failed to publish data for the requested date.
* **Fxtop Cross-reference:** Interlinks queries closely with Fxtop DB endpoints for calibration and external sanity checks.
