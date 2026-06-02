import React from 'react';
import { ShieldAlert, FileText, Database, Shield, CheckCircle, Presentation, Users, TrendingDown, Eye, Lock, Clock, ServerCrash, CheckSquare, Layers } from 'lucide-react';
import PresentationViewer from './PresentationViewer';
import Bloc1GovernanceDemo from './demos/Bloc1GovernanceDemo';

export default function Bloc1Governance() {
    
    // Helper to render visual icons for slides
    const renderIcon = (Icon: any, label: string) => (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <Icon size={72} strokeWidth={1.5} className="mb-4" />
            <span className="font-bold tracking-widest uppercase text-sm">{label}</span>
        </div>
    );

    const presentationSlides = [
        { num: 1, title: "Title & Introduction", content: "Introduce Project: Atomic-Link and your dual-profile (Finance & AI).", script: "Good morning. I'm Shuhan CHANG. Today I present Project: Atomic-Link, our comprehensive Data Governance and AI Supply Chain platform for Aurora Tech.", visualComponent: renderIcon(Presentation, "Atomic-Link Defense") },
        { num: 2, title: "Company Profile", content: "Aurora Tech's €699 Chromebook BOM (€450) relies on NVIDIA, TSMC, and AUO. Explain the financial vulnerability.", script: "Aurora Tech buys expensive components in USD/TWD but sells in EUR. A 5% drop in the EUR, combined with a 12-day shipping delay, crushes our profit margin from 8% to 1.9%.", visualComponent: renderIcon(TrendingDown, "Margin Profiling") },
        { num: 3, title: "Strategic Vision", content: "Bridging financial reporting with physical logistics via Agentic AI and predictive FX hedging.", script: "To fix this, we created a Single Source of Truth that connects real-time exchange rates with maritime tracking, allowing us to predict and prevent profit losses.", visualComponent: renderIcon(Eye, "Strategic AI Vision") },
        { num: 4, title: "Data Governance Council", content: "Structure of the DGC. Chaired by CDO, bridging Finance and Supply Chain.", script: "Great AI requires strict governance. We established a Data Governance Council to align our CFO and Supply Chain VP on single data standards.", visualComponent: renderIcon(Users, "Governance Structure") },
        { num: 5, title: "Accountability (RACI)", content: "CFO owns FX Data. VP Supply Chain owns Logistics data.", script: "Using a RACI matrix, we defined strict ownership. The CFO is accountable for exchange rate data, while the VP of Supply Chain owns shipping metadata.", visualComponent: renderIcon(Layers, "RACI Matrix") },
        { num: 6, title: "Role-Based Access (RBAC)", content: "Database separation of duties (Finance vs Logistics vs Admin).", script: "We enforce security at the database level. Logistics teams cannot alter exchange rates, and financial teams cannot modify shipping schedules.", visualComponent: renderIcon(Lock, "RBAC Security") },
        { num: 7, title: "Compliance (GDPR)", content: "AES-256 Encryption for PII. 5-year audit retention policy.", script: "To comply with GDPR, all supplier metadata is encrypted AES-256 at rest, and audit logs are safely archived for exactly five years before anonymization.", visualComponent: renderIcon(FileText, "Regulatory Audit") },
        { num: 8, title: "Data Quality SLA - Part 1", content: "Accuracy (ECB parity) & Completeness (no null fields).", script: "We prevent 'garbage-in, garbage-out' by strictly requiring exchange rates to match official ECB fixings to 4 decimal places, and enforcing 100% data completeness.", visualComponent: renderIcon(CheckCircle, "Accuracy SLA") },
        { num: 9, title: "Data Quality SLA - Part 2", content: "Timeliness (00:00 UTC execution) & Traceability (Airflow run_ids).", script: "Timeliness is critical. Our pipelines run daily at UTC midnight, and every row carries a unique Airflow ID to guarantee total traceability.", visualComponent: renderIcon(Clock, "Timeliness & Traceability") },
        { num: 10, title: "Failover Engineering", content: "Fallback protocols when Frankfurter API is down.", script: "We engineered strong failover protocols. If our external exchange rate API goes offline, the system automatically defaults to a 7-day moving average to keep business running.", visualComponent: renderIcon(ServerCrash, "Resilience Protocols") },
        { num: 11, title: "Lifecycle Management", content: "Ingestion -> Storage -> AWS Glacier Archiving -> Purging.", script: "Finally, our data lifecycle ensures raw payloads are cleaned, stored in our Star Schema, archived to AWS Glacier, and cryptographically purged after 10 years.", visualComponent: renderIcon(Database, "Data Lifecycle") },
        { num: 12, title: "Conclusion & Q&A", content: "Summary of Governance structure protecting the company.", script: "In conclusion, our data governance policy ensures compliant, high-quality data powers our AI. Thank you; I am now open to your questions.", visualComponent: renderIcon(CheckSquare, "Open For Questions") }
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
            <header className="mb-10 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-3 text-emerald-600 mb-2">
                    <ShieldAlert size={28} />
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bloc 1: Data Governance Policy & Strategy</h2>
                </div>
                <p className="text-lg text-slate-600 mt-2">Chromebook Supply Chain & Procurement Dual-Track Policy & Single Source of Truth (SSOT)</p>
            </header>

            <div className="space-y-12">
                <section>
                    <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">Chapter 1: Company Background & Goals</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">1.1 Company Profile & Supply Chain Risks</h4>
                            <p className="text-slate-600 leading-relaxed">
                                Aurora Tech Computing Group is a global manufacturer based in Paris, France, specializing in building Google Chromebooks. The manufacturing process relies on expensive computer parts bought from Asia (mostly Taiwan and South Korea) and shipped by sea to Europe.
                            </p>
                            <p className="text-slate-600 leading-relaxed mt-4">
                                Aurora Tech's biggest financial risk comes from exchange rate changes and shipping delays. The most expensive parts—like NVIDIA GPUs ($115), TSMC chips ($75), and AUO screens ($58)—are bought in US Dollars (USD) and Taiwan Dollars (TWD). But the finished Chromebooks are sold in Europe for Euros (EUR) at a price of €699, while costing €450 to build.
                            </p>
                            <p className="text-slate-600 leading-relaxed mt-4">
                                Normally, Aurora Tech makes an 8% profit (€55.90 per unit). But if the Euro loses 5% of its value against the USD, and ships are delayed by 12 days (forcing them to take a longer route), the cost increases by €42.50. This single delay drops the profit down to just 1.9%, putting the company at risk of losing money.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">1.2 Project Goal: Atomic-Link</h4>
                            <p className="text-slate-600 leading-relaxed">
                                Project: Atomic-Link is an AI system designed to connect our financial teams with our shipping teams. It watches live economic numbers and tracks ships at sea.
                            </p>
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mt-4">
                                <p className="text-indigo-900 leading-relaxed font-medium">
                                    When the system detects a long delay, the AI calculates if it is cheaper to switch from ocean shipping to Air France Cargo. While flying reduces the delay from 12 days to 2 days, the shipping cost jumps from €5 to €45. The platform calculates this instantly, alerting the finance team to lock in exchange rates with the bank before profits are lost.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">1.3 Data Sources</h4>
                            <p className="text-slate-600 leading-relaxed mb-3">To keep things simple and reliable, Aurora Tech gets its data from two main places:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <Database className="text-emerald-500 shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong className="text-slate-800">Financial Data (Live API):</strong>
                                        <p className="text-slate-600 text-sm mt-1">We automatically download daily currency exchange rates (EUR/USD, EUR/TWD) using the <a href="https://github.com/lineofflight/frankfurter" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">free Frankfurter API</a>.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FileText className="text-emerald-500 shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong className="text-slate-800">Logistics Data (Simulations):</strong>
                                        <p className="text-slate-600 text-sm mt-1">Because real-time ship tracking data is very expensive, Aurora Tech uses a simulator. It uses past data to create very realistic shipping delays and port arrivals for testing.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">Chapter 2: Organization, RACI, and Regulatory Compliance</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">2.1 Data Governance Council (DGC)</h4>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                The DGC oversees data quality, manages encryption keys, and audits AI model performance. It is chaired by the Chief Data Officer and includes executives from both Finance and Global Supply Chain divisions.
                            </p>

                            <h4 className="text-lg font-bold text-slate-800 mb-2">2.3 Role-Based Access Control (RBAC)</h4>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                                <div>
                                    <span className="font-bold text-slate-800 text-sm block">Role_Aurora Tech_Finance</span>
                                    <span className="text-slate-600 text-sm">Read-only access (SELECT) to financial dimensions and margin risk predictions.</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3">
                                    <span className="font-bold text-slate-800 text-sm block">Role_Aurora Tech_Logistics</span>
                                    <span className="text-slate-600 text-sm">Read-write access (SELECT, UPDATE) to shipping schedules, carrier modes, and port arrivals.</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3">
                                    <span className="font-bold text-indigo-700 text-sm block">Role_AI_Architect_Admin</span>
                                    <span className="text-slate-600 text-sm">Full administrative privileges (CRUD) to manage schemas, execute ETL pipelines, and deploy model endpoints.</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">2.2 RACI Matrix</h4>
                            <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                                To enforce strict accountability across financial and physical domains, data assets are mapped as follows:
                            </p>
                            
                            <div className="space-y-4">
                                <div className="border border-slate-200 rounded-lg overflow-hidden flex flex-col">
                                    <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 text-sm border-b border-slate-200">
                                        Macro FX Ingestion Stream (Frankfurter API)
                                    </div>
                                    <div className="p-4 bg-white text-sm space-y-2">
                                        <div className="flex"><span className="w-28 font-semibold text-slate-700">Accountable:</span><span className="text-slate-600">Chief Financial Officer (CFO)</span></div>
                                        <div className="flex"><span className="w-28 font-semibold text-slate-700">Responsible:</span><span className="text-slate-600">Group Financial Controller</span></div>
                                        <div className="flex"><span className="w-28 font-semibold text-slate-700">Consulted:</span><span className="text-slate-600">AI Financial Engineers</span></div>
                                        <div className="flex"><span className="w-28 font-semibold text-slate-700">Informed:</span><span className="text-slate-600">Procurement Operations Team</span></div>
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-lg overflow-hidden flex flex-col">
                                    <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 text-sm border-b border-slate-200">
                                        Component Logistics & Air France Cargo
                                    </div>
                                    <div className="p-4 bg-white text-sm space-y-2">
                                        <div className="flex"><span className="w-28 font-semibold text-slate-700">Accountable:</span><span className="text-slate-600">VP of Global Supply Chain</span></div>
                                        <div className="flex"><span className="w-28 font-semibold text-slate-700">Responsible:</span><span className="text-slate-600">Lead Logistics Planner</span></div>
                                        <div className="flex"><span className="w-28 font-semibold text-slate-700">Consulted:</span><span className="text-slate-600">MLOps and Data Platform Engineers</span></div>
                                        <div className="flex"><span className="w-28 font-semibold text-slate-700">Informed:</span><span className="text-slate-600">Warehouse Assembly Managers</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-lg font-bold text-slate-800 mb-4">2.4 GDPR & System Failover Policies</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Shield className="text-emerald-500" size={20} />
                                    <h5 className="font-bold text-slate-800">GDPR Compliance</h5>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    All vendor and operator metadata containing personal identifiable information (PII) is encrypted at rest using AES-256. Financial audit logs are retained for exactly 5 years before triggering automated anonymization routines.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <ShieldAlert className="text-amber-500" size={20} />
                                    <h5 className="font-bold text-slate-800">API Ingestion Resiliency</h5>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    If the Frankfurter API encounters a network timeout, the Airflow ingestion pipeline intercepts the exception, logs a critical alert to the DGC dashboard, and applies a 7-day historical moving average to ensure uninterrupted model execution.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <section>
                        <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">Chapter 3: Data Quality SLA & Monitoring</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={18} />
                                <div>
                                    <strong className="text-slate-800 block">Accuracy</strong>
                                    <span className="text-slate-600 text-sm">Exchange rate values must match official European Central Bank (ECB) fixings to 4 decimal places.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={18} />
                                <div>
                                    <strong className="text-slate-800 block">Completeness</strong>
                                    <span className="text-slate-600 text-sm">Simulated logistics records must contain non-null values for vessel_id, transport_mode, and freight_cost_eur.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={18} />
                                <div>
                                    <strong className="text-slate-800 block">Timeliness</strong>
                                    <span className="text-slate-600 text-sm">Pipelines run every 24 hours at 00:00 UTC. Ingestion latencies exceeding 2 hours trigger an automated incident ticket.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={18} />
                                <div>
                                    <strong className="text-slate-800 block">Traceability</strong>
                                    <span className="text-slate-600 text-sm">Every row in the fact table contains an immutable created_at timestamp and an active Airflow run_id to ensure total data lineage.</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">Chapter 4: Data Lifecycle</h3>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
                            <div className="absolute left-[31px] top-8 bottom-8 w-0.5 bg-slate-200"></div>
                            
                            <div className="relative z-10 flex items-start gap-4 mb-6">
                                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold border-4 border-slate-50 shrink-0">1</div>
                                <div>
                                    <strong className="text-slate-800 block mb-1">Ingestion</strong>
                                    <span className="text-slate-600 text-sm">Temporary staging of raw JSON payloads.</span>
                                </div>
                            </div>
                            
                            <div className="relative z-10 flex items-start gap-4 mb-6">
                                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold border-4 border-slate-50 shrink-0">2</div>
                                <div>
                                    <strong className="text-slate-800 block mb-1">Storage</strong>
                                    <span className="text-slate-600 text-sm">Cleaning and loading into the structured Star Schema.</span>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-start gap-4 mb-6">
                                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold border-4 border-slate-50 shrink-0">3</div>
                                <div>
                                    <strong className="text-slate-800 block mb-1">Archiving</strong>
                                    <span className="text-slate-600 text-sm">Automatic transfer to cold glacier storage (AWS Glacier) after 5 years of active audit retention.</span>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold border-4 border-slate-50 shrink-0">4</div>
                                <div>
                                    <strong className="text-slate-800 block mb-1">Purging</strong>
                                    <span className="text-slate-600 text-sm">Permanent cryptographic wiping of data after 10 years.</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* DEMO SECTION */}
                <div className="mt-16 border-t border-slate-200 pt-12">
                    <Bloc1GovernanceDemo />
                </div>

                {/* PRESENTATION SECTION */}
                <div className="mt-16 border-t border-slate-200 pt-12">
                    <div className="bg-indigo-900 rounded-2xl p-8 shadow-xl text-white mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Presentation size={32} className="text-indigo-400" />
                            <div>
                                <h3 className="text-2xl font-bold">Bloc 1 Defense Presentation (10-15 Slides)</h3>
                                <p className="text-indigo-300 mt-1">Official Requirement: 15min Oral Presentation + 15min Q&A (French or English)</p>
                            </div>
                        </div>
                        <PresentationViewer title="Bloc 1: Data Governance & Strategy" slides={presentationSlides} accentColor="indigo" />
                    </div>
                </div>
            </div>
        </div>
    );
}
