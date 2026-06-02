import React from 'react';
import { GitMerge, FileCode2, Workflow, Link2, RefreshCw, PlayCircle, Eye, Video } from 'lucide-react';
import PresentationViewer from './PresentationViewer';
import Bloc3PipelinesDemo from './demos/Bloc3PipelinesDemo';

export default function Bloc3Pipelines() {
    const renderIcon = (Icon: any, label: string) => (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <Icon size={72} strokeWidth={1.5} className="mb-4 text-rose-400" />
            <span className="font-bold tracking-widest uppercase text-sm text-rose-300">{label}</span>
        </div>
    );

    const presentationSlides = [
        { num: 1, title: "ETL System Architecture", content: "Overview of Apache Airflow, Python tasks, and the PostgreSQL Destination.", script: "Good morning! For Bloc 3, I am presenting our automated Data Pipeline. We chose Apache Airflow to orchestrate a complex, dual-stream data ingestion process running every midnight.", visualComponent: renderIcon(Workflow, "Airflow Orchestration") },
        { num: 2, title: "Extraction: The Dual-Stream Approach", content: "Explain live Frankfurter API (EUR/USD) + Logistics Simulator (Delay telemetry).", script: "Our extraction layer is unique. It pulls real-time currency exchange rates from the Frankfurter API, and simultaneously runs a stochastic logistics simulator to generate realistic shipping delays for our hardware components.", visualComponent: renderIcon(Link2, "Dual-Stream Extraction") },
        { num: 3, title: "Transformation: The 'Ocean-to-Air' Logic", content: "Highlight the code that upgrades transport to Air France Cargo if Sea Delay >= 12 days.", script: "During transformation, our code applies business logic: if our critical NVIDIA GPUs face a severe 12-day sea delay, the pipeline automatically converts the shipping mode to Air France Cargo, reflecting a drop in delay but a spike in freight cost.", visualComponent: renderIcon(RefreshCw, "Ocean-to-Air Logic") },
        { num: 4, title: "Live Demonstration (Loom Segment)", content: "Screencast of Airflow Web UI, triggering the DAG, and checking Postgres.", script: "[Video Auto-plays] In the Airflow interface, I manually trigger our daily DAG. You can see the task turns green, indicating a successful run. Querying our database confirms the real-time rates and simulated delays successfully loaded.", visualComponent: renderIcon(PlayCircle, "Live Pipeline Demo") },
        { num: 5, title: "Monitoring & Conclusion", content: "Discuss data quality error catching (Fallback to moving average).", script: "We also integrated data quality monitoring. If the external API fails, our Airflow script intercepts the error and loads backup average rates. The pipeline is robust, automated, and ready for production.", visualComponent: renderIcon(Eye, "Pipeline Observability") }
    ];
    const pythonCode = `from datetime import datetime, timedelta
import random
import requests
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.postgres.hooks.postgres import PostgresHook

default_args = {
    'owner': 'Shuhan_Chang',
    'depends_on_past': False,
    'start_date': datetime(2026, 6, 1),
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}

def extract_transform_load_chromebook():
    """
    Main Data Task:
    1. Download: Get live exchange rates from Frankfurter API + Simulate shipping delays.
    2. Process: Switch from Ocean to Air Cargo if Sea Delay is 12 days or more.
    3. Save: Save the final data into the PostgreSQL database.
    """
    # ---- 1. DOWNLOAD: Live Exchange Rates (EUR/USD, EUR/TWD) ----
    # Source: Free Frankfurter API (https://github.com/lineofflight/frankfurter)
    fx_url = "https://api.frankfurter.dev/v1/latest?base=EUR"
    try:
        response = requests.get(fx_url, timeout=10)
        response.raise_for_status()
        fx_data = response.json()
        eur_to_usd = fx_data['rates']['USD']
        eur_to_twd = fx_data['rates']['TWD']
    except Exception as e:
        print(f"[WARNING] Download failed. Using backup average rates: {e}")
        eur_to_usd, eur_to_twd = 1.0820, 35.150

    # ---- 2. PROCESS: Simulate Delays & Test Ocean-to-Air Switch ----
    vendors = ['VND-NV-01', 'VND-TSMC-02', 'VND-AUO-03']
    target_date = datetime.now().date()
    records = []

    for v_id in vendors:
        # Simulate normal sea shipping delay
        delay = random.choices([0, 1, 3, 12], weights=[0.5, 0.3, 0.1, 0.1])[0]
        transport_mode = 'Sea Freight'
        freight_cost_eur = 5.00 # Base sea shipping cost

        # Backup Plan: Fly high-value NVIDIA GPUs if sea delay is very bad (>= 12 days)
        if v_id == 'VND-NV-01' and delay >= 12:
            transport_mode = 'Air France Cargo'
            delay = 2 # Flying reduces delay to 2 days
            freight_cost_eur = 45.00 # Higher air shipping cost

        # Profit Risk Rules: We lose money if shipping cost jumps to €45 OR if Euro drops (< 1.05)
        margin_drop_label = 1 if (freight_cost_eur >= 45.00 or eur_to_usd < 1.05) else 0
        
        records.append((target_date, v_id, eur_to_usd, eur_to_twd, delay, transport_mode, freight_cost_eur, margin_drop_label))

    # ---- 3. SAVE: Save into PostgreSQL Database ----
    pg_hook = PostgresHook(postgres_conn_id='auroratech_postgres_conn')
    
    # Save Dates
    pg_hook.run("""
        INSERT INTO dim_date (date_key, year, month, day, quarter)
        VALUES (%s, %s, %s, %s, %s) ON CONFLICT (date_key) DO NOTHING;
    """, parameters=(target_date, target_date.year, target_date.month, target_date.day, (target_date.month-1)//3+1))

    # Save Main Records
    for r in records:
        pg_hook.run("""
            INSERT INTO fact_chromebook_margin_risk 
            (date_key, vendor_id, eur_to_usd, eur_to_twd, component_delay_days, transport_mode, freight_cost_eur, margin_drop_label)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
        """, parameters=r)
        print(f"[SUCCESS] Vendor={r[1]} | Mode={r[5]} | Cost={r[6]} EUR | Delay={r[4]} Days")

with DAG(
    'auroratech_chromebook_supply_chain_pipeline',
    default_args=default_args,
    description='Aurora Tech Chromebook Supply Chain Data Pipeline',
    schedule_interval='@daily',
    catchup=False,
) as dag:

    run_pipeline = PythonOperator(
        task_id='execute_chromebook_etl_task',
        python_callable=extract_transform_load_chromebook,
    )
`;

    return (
        <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
            <header className="mb-10 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-3 text-emerald-600 mb-2">
                    <GitMerge size={28} />
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bloc 3: Real-Time Data Pipelines</h2>
                </div>
                <p className="text-lg text-slate-600 mt-2">Real-Time Data Pipelines Code (Airflow DAG)</p>
            </header>

            {/* DEMO SECTION */}
            <section className="mb-12">
                <Bloc3PipelinesDemo />
            </section>

            <div className="space-y-10 border-t border-slate-200 pt-10">
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FileCode2 size={20} className="text-blue-500" />
                            auroratech_pipeline.py
                        </h3>
                    </div>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <span className="text-xs text-slate-400 font-mono ml-2">auroratech_pipeline.py</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-blue-300 font-mono text-sm leading-relaxed">
                                <code>{pythonCode}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                {/* PRESENTATION SECTION */}
                <div className="mt-16 border-t border-slate-200 pt-12">
                    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-white mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <GitMerge size={32} className="text-rose-400" />
                            <div>
                                <h3 className="text-2xl font-bold">Bloc 3 Defense Presentation</h3>
                                <p className="text-slate-400 mt-1">Official Requirement: 5min Oral Presentation + 15min Q&A (Real-time Pipeline Demo)</p>
                            </div>
                        </div>
                        <PresentationViewer title="Bloc 3: Real-Time Data Pipelines" slides={presentationSlides} accentColor="rose" />
                    </div>
                </div>
            </div>
        </div>
    );
}
