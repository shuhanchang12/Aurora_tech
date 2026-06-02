-- Create Dimension Table 1: Date Dimension
CREATE TABLE IF NOT EXISTS dim_date (
    date_key DATE PRIMARY KEY,
    year INT NOT NULL,
    month INT NOT NULL,
    day INT NOT NULL,
    quarter INT NOT NULL
);

-- Create Dimension Table 2: Chromebook Hardware Vendor Master Data
CREATE TABLE IF NOT EXISTS dim_chromebook_vendor (
    vendor_id VARCHAR(50) PRIMARY KEY,
    vendor_name VARCHAR(100) NOT NULL,
    component_type VARCHAR(50) NOT NULL, -- e.g., GPU, CPU, Display Panel
    origin_country VARCHAR(50) NOT NULL
);

-- Create Fact Table: Chromebook Product Line Gross Margin Risk Fact Table
CREATE TABLE IF NOT EXISTS fact_chromebook_margin_risk (
    fact_id SERIAL PRIMARY KEY,
    date_key DATE REFERENCES dim_date(date_key),
    vendor_id VARCHAR(50) REFERENCES dim_chromebook_vendor(vendor_id),
    eur_to_usd NUMERIC(10, 4) NOT NULL,            -- Ingested from Frankfurter API
    eur_to_twd NUMERIC(10, 4) NOT NULL,            -- Ingested from Frankfurter API
    component_delay_days INT NOT NULL,              -- Simulated Logistics Delay
    transport_mode VARCHAR(50) NOT NULL,            -- 'Sea Freight' or 'Air France Cargo'
    freight_cost_eur NUMERIC(10, 2) NOT NULL,       -- Unit shipping cost (Sea: 5.00, Air: 45.00)
    margin_drop_label INT NOT NULL,                 -- 0: Stable Margin, 1: Margin Impacted (Triggered)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre-populate critical hardware vendors
INSERT INTO dim_chromebook_vendor (vendor_id, vendor_name, component_type, origin_country) VALUES
('VND-NV-01', 'NVIDIA Corporation', 'GPU', 'USA'),
('VND-TSMC-02', 'TSMC Foundry Services', 'CPU/Chipset', 'Taiwan'),
('VND-AUO-03', 'AU Optronics Corp', 'Display Panel', 'Taiwan')
ON CONFLICT (vendor_id) DO NOTHING;
