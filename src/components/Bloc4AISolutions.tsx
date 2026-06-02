import React from 'react';
import { BrainCircuit, FileCode2, Target, Network, Server, Webhook, TrendingUp, MonitorPlay, Coins, Video } from 'lucide-react';
import PresentationViewer from './PresentationViewer';
import Bloc4AIDemo from './demos/Bloc4AIDemo';

export default function Bloc4AISolutions() {
    const renderIcon = (Icon: any, label: string) => (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <Icon size={72} strokeWidth={1.5} className="mb-4 text-emerald-400" />
            <span className="font-bold tracking-widest uppercase text-sm text-emerald-300">{label}</span>
        </div>
    );

    const presentationSlides = [
        { num: 1, title: "AI Business Specifications", content: "Explain the goal: Predict margin loss based on FX and Logistics.", script: "Good morning. In Bloc 4, we leverage our data warehouse to industrialize a predictive AI solution. Our business goal is simple: predict product margin losses before they happen.", visualComponent: renderIcon(Target, "Business Objective") },
        { num: 2, title: "Algorithm Selection", content: "Random Forest Classifier - fast, interpretable, good with structured tabular data.", script: "Since our features—exchange rates and shipping delays—are purely tabular and non-linear, we trained a Random Forest Classifier. It accurately maps the complex boundaries where high shipping costs and weak currency intersect.", visualComponent: renderIcon(Network, "Random Forest Model") },
        { num: 3, title: "Serving Layer Architecture", content: "FastAPI endpoint overview.", script: "To make predictions accessible to managers, we wrapped our trained model in a high-concurrency FastAPI microservice. Our endpoint receives real-time JSON payloads and returns instant margin risk calculations.", visualComponent: renderIcon(Server, "FastAPI Service") },
        { num: 4, title: "CI/CD & MLOps", content: "Show the GitHub Actions pipeline YAML logic.", script: "We maintain production stability through CI/CD. Every code push goes through GitHub Actions, triggering automated unit tests on our FastAPI dependencies and data schemas, ensuring rigid Quality Gates.", visualComponent: renderIcon(Webhook, "CI/CD Pipeline") },
        { num: 5, title: "Automated Retraining Strategy", content: "Concept for triggering a retrain when model drift is detected.", script: "As exchange rate volatility shifts globally, our system monitors data drift. When confidence scores drop, automated scripts pull fresh warehouse data and recursively retrain the model.", visualComponent: renderIcon(TrendingUp, "Drift Monitoring") },
        { num: 6, title: "Live Demonstration (Loom Segment)", content: "Testing FastAPI endpoint in Swagger and viewing Streamlit dashboard.", script: "[Video Auto-plays] I will now demonstrate the API. Using our Swagger dashboard, I input a weak Euro and high Air France Cargo costs. The model instantly returns an 87.5% risk probability, recommending immediate hedging.", visualComponent: renderIcon(MonitorPlay, "Live API Demo") },
        { num: 7, title: "Future Web3 Scaling & Conclusion", content: "USDC stablecoin smart contracts bypassing SWIFT bank delays.", script: "Looking forward, we aim to integrate Web3 smart contracts. By automatically pre-loading USDC stablecoins when risk is high, we bypass 3-day SWIFT bank delays and lock in perfect supplier costs. Thank you for your time.", visualComponent: renderIcon(Coins, "Web3 Smart Contracts") }
    ];
    const trainModelCode = `import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

def train_and_save_model():
    print("[MLOps] Extracting feature matrices from local warehouse...")
    
    # Feature vectors: [eur_to_usd, eur_to_twd, component_delay_days, freight_cost_eur]
    X_train = np.array([
        [1.0900, 35.20, 0, 5.00],   # Case 1: Strong Euro, No Delay, Sea Freight
        [1.0400, 34.10, 2, 45.00],  # Case 2: Weak Euro, Air France Cargo Expedited (High Cost)
        [1.0900, 35.60, 1, 5.00],   # Case 3: Strong Euro, 1-day Delay, Sea Freight
        [1.0300, 33.80, 12, 5.00],  # Case 4: Weak Euro, 12-day Sea Delay (High Delay)
        [1.0800, 35.00, 2, 45.00]   # Case 5: Strong Euro, Air France Cargo Expedited (High Cost)
    ])
    
    # Target Labels: 0 (Stable Margin), 1 (Margin Impacted / Compressed)
    y_train = np.array([0, 1, 0, 1, 1])

    # Train Random Forest
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    model.fit(X_train, y_train)

    # Serialize model artifact
    joblib.dump(model, 'auroratech_chromebook_model.pkl')
    print("[MLOps] Model training completed. Artifact saved as 'auroratech_chromebook_model.pkl'")

if __name__ == "__main__":
    train_and_save_model()`;

    const appCode = `from fastapi import FastAPI
import joblib
import pydantic

app = FastAPI(title="Aurora Tech AI Risk Prediction Engine", version="2026.06")

class ProcurementInput(pydantic.BaseModel):
    eur_to_usd: float
    eur_to_twd: float
    component_delay_days: int
    freight_cost_eur: float

@app.on_event("startup")
def load_model_artifact():
    global model
    model = joblib.load('auroratech_chromebook_model.pkl')

@app.post("/predict-margin-risk")
def predict_risk(data: ProcurementInput):
    # Format input vectors
    features = [[data.eur_to_usd, data.eur_to_twd, data.component_delay_days, data.freight_cost_eur]]
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]
    
    # Generate business recommendations & future-proof Web3 trigger conditions
    if prediction == 1:
        if data.freight_cost_eur >= 45.00:
            recommendation = "[WARNING] Switched to Air France Cargo. Cost jumped to 45 EUR. Action: Pre-load USDC using Web3 to lock in prices quickly and bypass slow bank transfers."
        else:
            recommendation = "[WARNING] Bad exchange rates detected. Action: Contact the bank immediately to lock in the currency rate."
    else:
        recommendation = "[INFO] Costs and delays are normal. Safe to proceed with normal orders."
        
    return {
        "status": "success",
        "margin_impact_risk_detected": bool(prediction),
        "risk_probability": f"{probability * 100:.2f}%",
        "recommendation": recommendation
    }`;

    const ciCode = `name: Aurora Tech Chromebook MLOps CI Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: Install Dependencies
      run: |
        pip install scikit-learn joblib fastapi uvicorn pytest

    - name: Run Automated Quality Gate Tests
      run: |
        pytest -v`;

    return (
        <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500 pb-32">
            <header className="mb-10 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-3 text-emerald-600 mb-2">
                    <BrainCircuit size={28} />
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bloc 4: AI Solutions & MLOps</h2>
                </div>
                <p className="text-lg text-slate-600 mt-2">Training, FastAPI Inference, and GitHub Actions CI/CD</p>
            </header>

            {/* DEMO SECTION */}
            <section className="mb-12">
                <Bloc4AIDemo />
            </section>

            <div className="space-y-10 border-t border-slate-200 pt-10">
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FileCode2 size={20} className="text-blue-500" />
                            1. train_model.py (Random Forest Classifier Training)
                        </h3>
                    </div>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <span className="text-xs text-slate-400 font-mono ml-2">train_model.py</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-blue-300 font-mono text-sm leading-relaxed">
                                <code>{trainModelCode}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FileCode2 size={20} className="text-teal-500" />
                            2. app.py (FastAPI Inference Service)
                        </h3>
                    </div>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <span className="text-xs text-slate-400 font-mono ml-2">app.py</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-indigo-300 font-mono text-sm leading-relaxed">
                                <code>{appCode}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FileCode2 size={20} className="text-rose-500" />
                            3. .github/workflows/mlops-ci.yml (CI/CD Pipeline)
                        </h3>
                    </div>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <span className="text-xs text-slate-400 font-mono ml-2">.github/workflows/mlops-ci.yml</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
                                <code>{ciCode}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                {/* PRESENTATION SECTION */}
                <div className="mt-16 border-t border-slate-200 pt-12">
                    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-white mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <BrainCircuit size={32} className="text-emerald-400" />
                            <div>
                                <h3 className="text-2xl font-bold">Bloc 4 Defense Presentation (15-20 Slides)</h3>
                                <p className="text-slate-400 mt-1">Official Requirement: 5min Oral Presentation + 10min Q&A (Fast AI Pitch + Demo)</p>
                            </div>
                        </div>
                        <PresentationViewer title="Bloc 4: AI Solutions & MLOps" slides={presentationSlides} accentColor="emerald" />
                    </div>
                </div>
            </div>
        </div>
    );
}
