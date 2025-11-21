import React from 'react';
import OrganismLab from './components/OrganismLab';
import { FlaskConical, Zap } from './components/Icons';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              BioLab Assistant
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4">
        <OrganismLab />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
            <span>Powered by Google Gemini</span>
          </div>
          <p>© {new Date().getFullYear()} BioLab Assistant. For research purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;