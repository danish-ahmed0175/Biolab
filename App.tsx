import React, { useState } from 'react';
import { FlaskConical, Camera, Beaker, Zap } from 'lucide-react';
import OrganismLab from './components/OrganismLab.tsx';
import VisionLab from './components/VisionLab.tsx';
import { AppTab } from './types.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.ORGANISM);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <Beaker className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              BioLab Assistant
            </h1>
          </div>
          
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab(AppTab.ORGANISM)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === AppTab.ORGANISM 
                  ? 'bg-white text-indigo-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span className="hidden sm:inline">Media & Genome</span>
              <span className="sm:hidden">Media</span>
            </button>
            <button
              onClick={() => setActiveTab(AppTab.VISION)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === AppTab.VISION
                  ? 'bg-white text-purple-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Nano Vision</span>
              <span className="sm:hidden">Vision</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4">
        {activeTab === AppTab.ORGANISM && <OrganismLab />}
        {activeTab === AppTab.VISION && <VisionLab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>Demo Mode (Simulated Results)</span>
          </div>
          <p>© {new Date().getFullYear()} BioLab Assistant. For research purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;