# Bloc 3: Data Pipelines

## Overview

This block focuses on the ETL (Extract, Transform, Load) processes required to populate the Aurora Tech Data Warehouse. To ensure reliability, scheduling, and monitoring, we utilize Apache Airflow as our orchestration engine.

---

## 📊 Pipeline Flow (Airflow DAG)

The pipeline is structured as a Directed Acyclic Graph (DAG) scheduled to run daily. It demonstrates the flow of disjointed data sources merging into a unified analytical asset.

```mermaid
graph TD
    subgraph Extract Phase
        E1[fa:fa-cloud-download API: Extract FX Rates]
        E2[fa:fa-file-excel SFTP: Extract Logistics Data]
    end

    subgraph Transform Phase
        T1((Clean & Format Data))
        T2[Merge Datasets <br/> join on 'date_key']
        T1 --> T2
    end

    subgraph Governance / Quality Phase
        V1{Data Quality SLAs <br/> Completeness, Bounds}
    end

    subgraph Load Phase
        L1[(fa:fa-database PostgreSQL: Fact Table)]
    end

    E1 --> T1
    E2 --> T1
    T2 --> V1
    
    V1 -->|Validation Passed| L1
    V1 -->|Validation Failed| Alert[fa:fa-envelope Trigger Alert & Halt Pipeline]
    
    style E1 fill:#e1f5fe,stroke:#0288d1
    style E2 fill:#e1f5fe,stroke:#0288d1
    style T2 fill:#fff3e0,stroke:#f57c00
    style V1 fill:#f3e5f5,stroke:#7b1fa2
    style L1 fill:#e8f5e9,stroke:#388e3c
    style Alert fill:#ffebee,stroke:#d32f2f,color:#d32f2f
```

---

## Directory Contents

### 1. `dags/auroratech_pipeline.py`
The core Airflow DAG file. It utilizes Python operators to define the ETL workflow.
-   Tasks are explicitly linked (`extract >> transform >> validate >> load`) to ensure execution order.

### 2. `Dockerfile`
A customized Dockerfile extending the official `apache/airflow` image.
-   Installs required OS-level build tools.
-   Installs specific Python dependencies required by our custom DAGs.

### 3. `requirements.txt`
Specifies the exact versions of the Python packages needed in the Airflow environment (`requests`, `pandas`, `apache-airflow-providers-postgres`).

## Deployment & Usage

To build the custom Airflow image locally based on our requirements:

```bash
# 1. Navigate to the pipelines directory
cd auroratech-repo/bloc3_pipelines

# 2. Build the Docker image
docker build -t auroratech-airflow-custom:latest .
```

*Note: Executing the Airflow environment locally requires a full Airflow `docker-compose` setup mapping to the `/dags` directory. The provided code represents the production-ready DAG and environment definition.*
