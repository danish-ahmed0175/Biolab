import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Wand2, Loader2, Download, AlertCircle, Camera, X } from 'lucide-react';
import { editImage } from '../services/gemini.ts';

const VisionLab: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        setGeneratedImage(null); // Reset previous generation
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      // Extract base64 data without prefix
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      const resultUrl = await editImage(base64Data, mimeType, prompt);
      setGeneratedImage(resultUrl);
    } catch (err: any) {
      console.error(err);
      setError("Failed to edit image. Please check the prompt and try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    setPrompt('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-3">
          <Wand2 className="w-8 h-8 text-purple-600" />
          Nano Vision Editor
        </h2>
        <p className="text-slate-500">
          Upload a lab image (plate, gel, slide) and use AI to apply filters, highlight regions, or clean up noise.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Input Section */}
        <div className="space-y-6">
          
          {/* Upload Area */}
          <div 
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
              selectedImage ? 'border-purple-300 bg-purple-50/30' : 'border-slate-300 hover:border-purple-400 hover:bg-slate-50'
            }`}
          >
            {selectedImage ? (
              <div className="relative group">
                <img 
                  src={selectedImage} 
                  alt="Original" 
                  className="w-full h-64 object-contain rounded-lg bg-white shadow-sm" 
                />
                <button 
                  onClick={clearAll}
                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full shadow-md text-slate-600 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center h-64 cursor-pointer"
              >
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">Upload Image</h3>
                <p className="text-slate-400 text-sm mt-1">JPG or PNG supported</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" 
            />
          </div>

          {/* Prompt Input */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Edit Instructions
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Highlight the bacterial colonies in red', 'Remove the background noise', 'Add a retro filter'"
              className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none min-h-[100px] resize-none"
            />
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={loading || !selectedImage || !prompt}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-purple-200 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="h-full">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
             <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
               <ImageIcon className="w-5 h-5 text-purple-600" />
               Result
             </h3>
             
             <div className="flex-grow flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 min-h-[400px] relative overflow-hidden">
               {loading ? (
                 <div className="text-center">
                   <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-3" />
                   <p className="text-purple-600 font-medium animate-pulse">AI is thinking...</p>
                 </div>
               ) : generatedImage ? (
                 <img 
                   src={generatedImage} 
                   alt="Edited Result" 
                   className="w-full h-full object-contain"
                 />
               ) : (
                 <div className="text-center text-slate-400 p-8">
                   <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                   <p>Edited image will appear here</p>
                 </div>
               )}
             </div>

             {generatedImage && (
               <div className="mt-6 flex justify-center">
                 <a 
                   href={generatedImage} 
                   download="edited-lab-image.png"
                   className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors font-medium shadow-lg"
                 >
                   <Download className="w-5 h-5" />
                   Download Image
                 </a>
               </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default VisionLab;