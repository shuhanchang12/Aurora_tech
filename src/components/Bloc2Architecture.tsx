import React from 'react';
import { Database, FileCode2, Layers, Box, LayoutTemplate, Play, ShieldCheck, Video } from 'lucide-react';
import PresentationViewer from './PresentationViewer';
import Bloc2ArchitectureDemo from './demos/Bloc2ArchitectureDemo';

export default function Bloc2Architecture() {

    const renderIcon = (Icon: any, label: string) => (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <Icon size={72} strokeWidth={1.5} className="mb-4 text-blue-400" />
            <span className="font-bold tracking-widest uppercase text-sm text-blue-300">{label}</span>
        </div>
    );

    const presentationSlides = [
        { num: 1, title: "Architecture Needs & Constraints", content: "Explain why a Star Schema and Docker were chosen. High-volume daily ingestion.", script: "Hello! For Bloc 2 Data Architecture, our goal was to build a fast, reproducible enterprise data warehouse. We chose a Star Schema to quickly join our temporal and supplier dimensions to our margin risk facts.", visualComponent: renderIcon(Layers, "Star Schema Need") },
        { num: 2, title: "Data Model (ERD)", content: "Display the ERD: dim_date, dim_chromebook_vendor, fact_chromebook_margin_risk.", script: "As shown in our Entity-Relationship Diagram, our central fact table links directly to our vendor dimension, which stores our key hardware suppliers like NVIDIA, TSMC, and AUO.", visualComponent: renderIcon(LayoutTemplate, "ERD Diagram") },
        { num: 3, title: "Infrastructure as Code (IaC)", content: "Show the docker-compose.yml architecture (PostgreSQL 15-alpine).", script: "To guarantee reproducibility, we adopted Infrastructure as Code. We packaged our warehouse in a lightweight Docker Alpine container, making it easy to deploy identically on any cloud environment.", visualComponent: renderIcon(Box, "Docker Containers") },
        { num: 4, title: "Live Demonstration (Loom Segment)", content: "Screencast of `docker-compose up -d` & `SELECT * FROM dim_chromebook_vendor`.", script: "[Video Auto-plays] As you can see in my terminal, I simply run docker-compose up, and our database boots instantly. We connect to it, and our supplier tables are automatically pre-populated and ready for data.", visualComponent: renderIcon(Play, "Demo: Compose Up") },
        { num: 5, title: "Monitoring & Conclusion", content: "Highlight data storage resilience and transition to pipelines.", script: "With our secure, containerized storage layer active, our architecture is now ready to receive high-velocity data from our Airflow pipelines. Thank you, I am ready for your questions.", visualComponent: renderIcon(ShieldCheck, "Storage Resilience") }
    ];
    const dockerCode = `version: '3.8'

services:
  # Database engine hosting the Aurora Tech Chromebook Data Warehouse
  postgres_db:
    image: postgres:15-alpine
    container_name: auroratech_postgres_dw
    environment:
      POSTGRES_USER: auroratech_admin
      POSTGRES_PASSWORD: TechMargin2026!
      POSTGRES_DB: auroratech_chromebook_dw
    ports:
      - "5432:5432"
    volumes:
      - postgres_tech_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_tech_data:`;

    const sqlCode = `-- Create Dimension Table 1: Date Dimension
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
ON CONFLICT (vendor_id) DO NOTHING;`;

    return (
        <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
            <header className="mb-10 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-3 text-emerald-600 mb-2">
                    <Database size={28} />
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bloc 2: Data Architecture</h2>
                </div>
                <p className="text-lg text-slate-600 mt-2">Data Architecture Code (Docker & Postgres DDL)</p>
            </header>

            {/* DEMO SECTION */}
            <section className="mb-12">
                <Bloc2ArchitectureDemo />
            </section>

            <div className="space-y-10 border-t border-slate-200 pt-10">
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Layers size={20} className="text-blue-500" />
                            1. docker-compose.yml
                        </h3>
                    </div>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <span className="text-xs text-slate-400 font-mono ml-2">docker-compose.yml</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
                                <code>{dockerCode}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FileCode2 size={20} className="text-teal-500" />
                            2. init.sql (Star Schema Definition)
                        </h3>
                    </div>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <span className="text-xs text-slate-400 font-mono ml-2">init.sql</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-blue-400 font-mono text-sm leading-relaxed">
                                <code>{sqlCode}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                {/* PRESENTATION SECTION */}
                <div className="mt-16 border-t border-slate-200 pt-12">
                    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-white mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Layers size={32} className="text-blue-400" />
                            <div>
                                <h3 className="text-2xl font-bold">Bloc 2 Defense Presentation</h3>
                                <p className="text-slate-400 mt-1">Official Requirement: 5min Oral Presentation + 15min Q&A (Infrastructure Demo)</p>
                            </div>
                        </div>
                        <PresentationViewer title="Bloc 2: Data Architecture & Infrastructure" slides={presentationSlides} accentColor="blue" />
                    </div>
                </div>
            </div>
        </div>
    );
}
