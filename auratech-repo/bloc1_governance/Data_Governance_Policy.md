# PART 1: BLOC 1 - DATA GOVERNANCE POLICY & STRATEGY

## Chapter 1: Corporate Context, Strategic Vision, and Data Assets

### 1.1 Enterprise Profile & Supply Chain Vulnerabilities
Aurora Tech Computing Group is a global Original Design Manufacturer (ODM) headquartered in Paris, France, specializing in high-performance Google Chromebook assemblies. The manufacturing process relies heavily on high-value components sourced from East Asia (primarily Taiwan and South Korea) and shipped via maritime routes to Western European distribution centers.

Aurora Tech's primary financial vulnerability is a structural currency and logistics mismatch. High-value Bill of Materials (BOM) components—most notably NVIDIA RTX GPUs ($115 contract unit price), TSMC-fabricated Companion SoCs ($75), and AUO IPS Display Panels ($58)—are purchased in USD and TWD. However, the finished Chromebooks are sold in European retail markets in Euros (EUR) at a target price of €699 against a base manufacturing cost (BOM) of €450.

Under stable conditions, Aurora Tech operates on an 8% target net margin (€55.90 profit per unit). However, a 5% depreciation of the Euro against the USD, combined with a 12-day maritime delay (forcing a bypass of the Suez Canal due to geopolitical tensions), drives the unit cost up by €42.50. This single supply chain disruption compresses the net margin down to an unsustainable 1.9%, risking structural financial losses.

### 1.2 Strategic Vision: Project: Atomic-Link
Project: Atomic-Link is a predictive AI platform designed to establish an organizational Single Source of Truth (SSOT). It bridges the gap between traditional financial reporting and inbound physical logistics. By placing an Agentic AI layer above our Advanced Work Packaging (AWP) and Product Lifecycle Management (PLM) infrastructure, the platform monitors real-time macroeconomic indicators and maritime transit telemetry.

When a critical delay is detected, the AI engine simulates an "Ocean-to-Air" conversion—modeling the cost-benefit of expediting GPU shipments via Air France Cargo to Paris CDG. While this reduces the delay from 12 days to 2 days, it spikes the unit freight cost from €5 to €45. The platform calculates this margin degradation instantly, alerting the Treasury Department to execute EUR/USD forward hedging contracts to lock in product profitability before customs clearance.

### 1.3 Data Ingestion & Inflow Strategy (Plan C Framework)
To eliminate integration risks and meet strict deployment deadlines, Aurora Tech utilizes a dual-stream ingestion architecture:
1. **Deterministic Financial Stream (Real-Time API):** Direct, programmatic ingestion of daily currency exchange pairs (EUR/USD, EUR/TWD) via the open-source, high-availability [Frankfurter API](https://github.com/lineofflight/frankfurter).
2. **Stochastic Logistics Stream (Simulated Telemetry):** Due to the high cost and data anomalies of raw commercial AIS feeds, Aurora Tech utilizes an in-house Logistics Simulator modeled on historical distributions of global maritime transit bottlenecks to generate synthetic container coordinates, delay metrics, and vessel statuses.

## Chapter 2: Organization, RACI, and Regulatory Compliance

### 2.1 Data Governance Council (DGC)
The DGC oversees data quality, manages encryption keys, and audits AI model performance. It is chaired by the Chief Data Officer and includes executives from both Finance and Global Supply Chain divisions.

### 2.2 RACI Matrix
To enforce strict accountability across financial and physical domains, data assets are mapped as follows:
* **Macro FX Ingestion Stream (Frankfurter API):**
  * Accountable: Chief Financial Officer (CFO).
  * Responsible: Group Financial Controller.
  * Consulted: AI Financial Engineers.
  * Informed: Procurement Operations Team.
* **Component Logistics & Air France Cargo Stream:**
  * Accountable: VP of Global Supply Chain.
  * Responsible: Lead Logistics Planner.
  * Consulted: MLOps and Data Platform Engineers.
  * Informed: Warehouse Assembly Managers.

### 2.3 Role-Based Access Control (RBAC)
Database schemas are locked down to three distinct security roles:
1. `Role_Aurora Tech_Finance`: Read-only access (SELECT) to financial dimensions and margin risk predictions.
2. `Role_Aurora Tech_Logistics`: Read-write access (SELECT, UPDATE) to shipping schedules, carrier modes, and port arrivals.
3. `Role_AI_Architect_Admin`: Full administrative privileges (CRUD) to manage schemas, execute ETL pipelines, and deploy model endpoints.

### 2.4 GDPR & System Failover Policies
* **GDPR Compliance:** All vendor and operator metadata containing personal identifiable information (PII) is encrypted at rest using AES-256. Financial audit logs are retained for exactly 5 years before triggering automated anonymization routines.
* **API Ingestion Resiliency:** If the Frankfurter API encounters a network timeout, the Airflow ingestion pipeline intercepts the exception, logs a critical alert to the DGC dashboard, and applies a 7-day historical moving average to ensure uninterrupted model execution.

## Chapter 3: Data Quality SLA & Monitoring
1. **Accuracy:** Exchange rate values must match official European Central Bank (ECB) fixings to 4 decimal places.
2. **Completeness:** Simulated logistics records must contain non-null values for vessel_id, transport_mode, and freight_cost_eur.
3. **Timeliness:** Pipelines run every 24 hours at 00:00 UTC. Ingestion latencies exceeding 2 hours trigger an automated incident ticket.
4. **Traceability:** Every row in the fact table contains an immutable created_at timestamp and an active Airflow run_id to ensure total data lineage.

## Chapter 4: Data Lifecycle Management
* **Ingestion:** Temporary staging of raw JSON payloads.
* **Storage:** Cleaning and loading into the structured Star Schema.
* **Archiving:** Automatic transfer to cold glacier storage (AWS Glacier) after 5 years of active audit retention.
* **Purging:** Permanent cryptographic wiping of data after 10 years.
