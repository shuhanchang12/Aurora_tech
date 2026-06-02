# Bloc 2: Data Architecture

## Overview

This block details the structural foundation of the Aurora Tech analytical environment. It provides both a local testing environment using Docker and PostgreSQL, as well as a strategic blueprint for cloud deployment using Terraform. 

---

## 📊 Architecture & Schemas

### 1. Star Schema Design (Data Warehouse)
The database utilizes a classic Star Schema optimized for analytical read queries and machine learning feature extraction. The central Fact table tracks margin risk, filtering dynamically through Date and Vendor Dimensions.

```mermaid
erDiagram
    FACT_CHROMEBOOK_MARGIN_RISK {
        serial id PK
        date date_key FK
        varchar vendor_id FK
        decimal eur_to_usd "Exchange Rate"
        decimal eur_to_twd "Exchange Rate"
        int component_delay_days "Logistics Metric"
        varchar transport_mode "Logistics Metric"
        decimal freight_cost_eur "Cost Metric"
        int margin_drop_label "ML Target (0 or 1)"
    }
    
    DIM_DATE {
        date date_key PK
        int year
        int month
        int day
        int quarter
    }
    
    DIM_VENDOR {
        varchar vendor_id PK
        varchar vendor_name
        varchar component_type "e.g., GPU, SoC"
    }

    DIM_DATE ||--o{ FACT_CHROMEBOOK_MARGIN_RISK : "Records risk at"
    DIM_VENDOR ||--o{ FACT_CHROMEBOOK_MARGIN_RISK : "Supplies components for"
```

### 2. Cloud Infrastructure Architecture (Terraform Blueprint)
The following diagram illustrates our planned cloud architecture defined via Terraform (`main.tf`), scaling from raw data lake to refined analytical models.

```mermaid
graph LR
    subgraph Data Sources
        API[FX REST APIs]
        VND[Vendor SFTPs]
    end

    subgraph AWS Cloud Architecture
        S3[(Amazon S3 Data Lake <br/> Raw & Archive)]
        RDS[(Amazon RDS PostgreSQL <br/> Data Warehouse)]
        
        API -->|Extract| S3
        VND -->|Extract| S3
        S3 -->|Clean & Load| RDS
    end

    subgraph Consumers
        ML[Bloc 4: ML Models]
        BI[React Dashboards]
        
        RDS -->|SQL Queries| ML
        RDS -->|SQL Queries| BI
    end
    
    style S3 fill:#f99026,stroke:#333
    style RDS fill:#336791,stroke:#fff,color:#fff
```

---

## Directory Contents

### 1. `docker-compose.yml`
Defines the local, containerized PostgreSQL environment exposing port `5432`.

### 2. `init.sql`
The master SQL script executed to construct the **Star Schema** detailed above. It handles schema creation, table definitions, and Role-Based Access Control (RBAC).

### 3. `setup.sh`
An interactive Bash utility script that simplifies the orchestration of the local environment for developers.

### 4. `terraform/main.tf`
The IaC (Infrastructure as Code) blueprint for our AWS migration, provisioning S3, RDS, and automated lifecycle policies.

## How to Run the Local Environment

Ensure you have Docker and Docker Compose installed on your machine.

```bash
# 1. Navigate to the architecture directory
cd auroratech-repo/bloc2_architecture

# 2. Make the setup script executable (Linux/macOS)
chmod +x setup.sh

# 3. Run the setup script
./setup.sh
```
