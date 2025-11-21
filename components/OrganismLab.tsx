import React, { useState } from 'react';
import { Search, FlaskConical, Dna, Loader2, AlertCircle, CheckCircle2, ArrowRight } from './Icons';
import { getMediaRecipe, getGenomeInfo } from '../services/gemini';

const OrganismLab = () => {
  const [organism, setOrganism] = useState('');
  const [volume, setVolume] = useState(1.0);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [recipe, setRecipe] = useState<any>(null);
  const [genome, setGenome] = useState<any>(null);

  const handleSearch = async () => {
    if (!organism.trim()) return;
    setLoading(true);
    setError(null);
    setRecipe(null);
    setGenome(null);

    try {
      // Parallel execution for efficiency
      const [recipeData, genomeData] = await Promise.all([
        getMediaRecipe(organism),
        getGenomeInfo(organism)
      ]);
      setRecipe(recipeData);
      setGenome(genomeData);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve organism data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      
      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-indigo-600" />
          Organism Search
        </h2>
        <p className="text-slate-500 mb-6">
          Enter an organism name (e.g., <i>E. coli</i>, <i>S. cerevisiae</i>) to find its growth media recipe and NCBI genome availability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={organism}
              onChange={(e) => setOrganism(e.target.value)}
              placeholder="Enter organism name..."
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !organism}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Analyze'}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Results Grid */}
      {(recipe || genome) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Media Recipe Card */}
          {recipe && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5" />
                    Media Preparation
                  </h3>
                  <span className="px-3 py-1 bg-white text-indigo-600 text-xs font-bold rounded-full border border-indigo-100">
                    RECIPE
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-indigo-800">{recipe.mediaName}</h4>
                <p className="text-sm text-indigo-600/80 mt-1">{recipe.description}</p>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                {/* Volume Calculator */}
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Target Volume: <span className="text-indigo-600 font-bold">{volume} Liters</span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="5.0"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0.1 L</span>
                    <span>5.0 L</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold text-slate-800 border-b pb-2">Ingredients</h5>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ing: any, idx: number) => (
                      <li key={idx} className="flex justify-between items-center text-slate-700 text-sm">
                        <span>{ing.name}</span>
                        <span className="font-mono font-medium bg-slate-100 px-2 py-1 rounded text-slate-900">
                          {(ing.amount * volume).toFixed(2)} {ing.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h5 className="font-semibold text-slate-800 mb-2">Instructions</h5>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                    {recipe.instructions.map((inst: string, idx: number) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Genome Info Card */}
          {genome && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
               <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                    <Dna className="w-5 h-5" />
                    Genomics (NCBI)
                  </h3>
                  {genome.isAvailable ? (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> AVAILABLE
                    </span>
                  ) : (
                     <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> CHECK SOURCE
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-semibold text-emerald-800">{genome.organismName}</h4>
              </div>

              <div className="p-6 flex-grow">
                <div className="prose prose-sm prose-slate text-slate-600 mb-6">
                  <p>{genome.summary}</p>
                </div>
                
                {genome.genomeSize && (
                   <div className="mb-6 flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                     <div className="p-2 bg-white rounded shadow-sm border border-slate-200">
                        <Dna className="w-5 h-5 text-emerald-500" />
                     </div>
                     <div>
                       <div className="text-xs text-slate-400 uppercase font-semibold">Genome Size</div>
                       <div className="font-medium text-slate-800">{genome.genomeSize}</div>
                     </div>
                   </div>
                )}

                {genome.ncbiLink && (
                  <a 
                    href={genome.ncbiLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between w-full p-4 bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md rounded-xl transition-all duration-200"
                  >
                    <span className="font-medium text-emerald-700 group-hover:text-emerald-600">View on NCBI Database</span>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />
                  </a>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default OrganismLab;