# Bloc 4: AI Solutions

## Overview

This block represents the predictive intelligence layer of the Aurora Tech MLOps project. Building upon the governed data warehouse securely populated by our pipelines, we have developed a Machine Learning model designed to predict severe margin drops in Chromebook production based on real-time FX fluctuations and vendor delays. 

---

## 📊 MLOps & Inference Architecture

### 1. Model Lifecycle & API Interaction
The diagram below illustrates how we transition from offline model training (using the Star Schema data) to real-time online inference using FastAPI.

```mermaid
sequenceDiagram
    autonumber
    actor Client as Dashboard/User
    participant FastAPI as FastAPI inference (Docker)
    participant Model as Random Forest (.pkl)
    participant DW as PostgreSQL Data Warehouse

    rect rgb(240, 248, 255)
        Note over DW, Model: 📦 Phase 1: Offline Training (src/train_model.py)
        DW->>Model: Extract Historical Fact/Dim data
        Model->>Model: Train RandomForestClassifier
        Model->>Model: Serialize to 'auroratech_chromebook_model.pkl'
    end

    rect rgb(245, 255, 250)
        Note over Client, Model: 🚀 Phase 2: Real-Time Inference (api/app.py)
        Client->>FastAPI: POST /predict <br/>{eur_to_usd: 1.08, delay_days: 12}
        FastAPI->>Model: Load .pkl & forward features
        Model-->>FastAPI: Return Prediction: Margin Drop Risk (0 or 1)
        FastAPI-->>Client: JSON Response: {risk_score: 85%, mitigation: "Hedge"}
    end
```

### 2. Feature Importance Profiling
*A key benefit of using a Random Forest model is explainability. The model prioritizes features dynamically:*
-   **Highest Impact:** `eur_to_usd` ratios (Macro-economic factors)
-   **High Impact:** `component_delay_days` (Supply Chain bottlenecks)
-   **Moderate Impact:** `freight_cost_eur` and `transport_mode`

---

## Directory Contents

### 1. `src/train_model.py`
The core machine learning script. It splits data, trains a `RandomForestClassifier` via `scikit-learn`, evaluates accuracy, and serializes the trained model to disk as a `.pkl` file.

### 2. `api/app.py`
A high-performance FastAPI web service that serves the trained model exposing a POST endpoint (`/predict`). Provides structural typing via Pydantic.

### 3. `requirements.txt`
Dependencies including `scikit-learn`, `fastapi`, `uvicorn`, and `pandas`.

### 4. `Dockerfile`
Packages the FastAPI application and the serialized model into a lightweight, standalone container, ready for deployment.

### 5. `Makefile`
A utility file providing shorthand CLI commands to simplify the MLOps lifecycle for data scientists.

## How to Train and Serve Locally

Ensure you have Python 3.10+ installed.

```bash
# Navigate to the ai solutions directory
cd auroratech-repo/bloc4_ai_solutions

# 1. Install local dependencies
pip install -r requirements.txt

# 2. Train the model (Outputs metrics and generates the .pkl file)
make train

# 3. Start the FastAPI inference server
make serve
```

Once the server is running, the Swagger API testing interface is available at: `http://127.0.0.1:8000/docs`

## Docker Deployment

To build and run the encapsulated microservice:

```bash
make docker-build
make docker-run
```
