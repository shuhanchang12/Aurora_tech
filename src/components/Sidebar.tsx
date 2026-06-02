import React from 'react';
import { ShieldCheck, Database, GitMerge, BrainCircuit, LayoutDashboard, Presentation } from 'lucide-react';

const Sidebar = ({ activeBloc, setActiveBloc }: { activeBloc: number, setActiveBloc: (id: number) => void }) => {
    const navItems = [
        { id: 0, name: 'Original Dashboard', icon: LayoutDashboard, desc: 'Legacy FX Rates & Uploads' },
        { id: 1, name: 'Bloc 1: Governance', icon: ShieldCheck, desc: 'Data Policies & RBAC' },
        { id: 2, name: 'Bloc 2: Architecture', icon: Database, desc: 'Star Schema & IaC' },
        { id: 3, name: 'Bloc 3: Pipelines', icon: GitMerge, desc: 'ETL & Airflow' },
        { id: 4, name: 'Bloc 4: AI Solutions', icon: BrainCircuit, desc: 'Predictive Models' },
        { id: 5, name: 'Defense Briefing', icon: Presentation, desc: 'Slides & Scripts' },
    ];

    return (
        <div className="w-80 bg-slate-900 text-white flex flex-col h-full shadow-2xl relative z-20">
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                    <LayoutDashboard size={28} />
                    <h1 className="text-xl font-bold tracking-tight">Project Aurora Tech</h1>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed tracking-wider font-semibold uppercase">
                    Chromebook Supply Chain & AI FX Platform
                </p>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">Master's Validation Blocks</div>
                {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeBloc === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveBloc(item.id)}
                            className={`w-full flex items-start gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-left ${isActive ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'hover:bg-slate-800 text-slate-300'}`}
                        >
                            <div className={`mt-0.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                                <Icon size={20} />
                            </div>
                            <div>
                                <div className="font-semibold">{item.name}</div>
                                <div className={`text-xs mt-1 ${isActive ? 'text-emerald-300/70' : 'text-slate-500'}`}>{item.desc}</div>
                            </div>
                        </button>
                    )
                })}
            </div>

            <div className="p-6 border-t border-slate-800 text-xs text-slate-500">
                <div className="flex justify-between items-center mb-2">
                    <span>Deadline</span>
                    <span className="flex items-center gap-1 text-red-500"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Urgent</span>
                </div>
                <div>Due: June 12, 2026 23:59 (UTC+2)</div>
            </div>
        </div>
    );
};

export default Sidebar;
