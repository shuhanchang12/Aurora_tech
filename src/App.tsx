import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OriginalFXDashboard from './components/OriginalFXDashboard';
import Bloc1Governance from './components/Bloc1Governance';
import Bloc2Architecture from './components/Bloc2Architecture';
import Bloc3Pipelines from './components/Bloc3Pipelines';
import Bloc4AISolutions from './components/Bloc4AISolutions';
import DefensePresentation from './components/DefensePresentation';

const App = () => {
    const [activeBloc, setActiveBloc] = useState(0);

    const renderContent = () => {
        switch (activeBloc) {
            case 0: return <OriginalFXDashboard />;
            case 1: return <Bloc1Governance />;
            case 2: return <Bloc2Architecture />;
            case 3: return <Bloc3Pipelines />;
            case 4: return <Bloc4AISolutions />;
            case 5: return <DefensePresentation />;
            default: return <OriginalFXDashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar activeBloc={activeBloc} setActiveBloc={setActiveBloc} />
            <main className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto">
                 {renderContent()}
            </main>
        </div>
    );
};

export default App;
