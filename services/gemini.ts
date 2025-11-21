import { MediaRecipe, GenomeInfo } from "../types.ts";

// --- Internal Database (Offline Mode) ---

const RECIPES: Record<string, MediaRecipe> = {
  "default": {
    mediaName: "Lysogeny Broth (LB)",
    description: "Standard rich growth medium for the culture of Escherichia coli and other enteric bacteria.",
    ingredients: [
      { name: "Tryptone", amount: 10, unit: "g" },
      { name: "Yeast Extract", amount: 5, unit: "g" },
      { name: "Sodium Chloride (NaCl)", amount: 10, unit: "g" }
    ],
    instructions: [
      "Measure 950 mL of distilled water.",
      "Add the ingredients and stir to dissolve.",
      "Adjust pH to 7.0 with 5N NaOH.",
      "Add distilled water to reach a final volume of 1 Liter.",
      "Autoclave at 121°C for 15 minutes."
    ]
  },
  "yeast": {
    mediaName: "YPD Broth (YEPD)",
    description: "Complete medium for the growth of Saccharomyces cerevisiae and other yeasts.",
    ingredients: [
      { name: "Yeast Extract", amount: 10, unit: "g" },
      { name: "Peptone", amount: 20, unit: "g" },
      { name: "Dextrose (Glucose)", amount: 20, unit: "g" }
    ],
    instructions: [
      "Dissolve Yeast Extract and Peptone in 900 mL water.",
      "Autoclave at 121°C for 15 minutes.",
      "Separately filter-sterilize 20% Dextrose solution.",
      "Add Dextrose to the autoclaved medium (once cooled to <60°C) to reach final volume."
    ]
  },
  "minimal": {
    mediaName: "M9 Minimal Media",
    description: "Minimal medium for E. coli containing only essential salts and a carbon source.",
    ingredients: [
      { name: "Na2HPO4", amount: 6, unit: "g" },
      { name: "KH2PO4", amount: 3, unit: "g" },
      { name: "NaCl", amount: 0.5, unit: "g" },
      { name: "NH4Cl", amount: 1, unit: "g" }
    ],
    instructions: [
      "Dissolve salts in water and autoclave.",
      "Add 1 mL 1M MgSO4 (sterile).",
      "Add 10 mL 20% Carbon Source (e.g., Glucose).",
      "Add 0.1 mL 1M CaCl2."
    ]
  }
};

export const getMediaRecipe = async (organism: string): Promise<MediaRecipe> => {
  // Simulate network delay slightly for realism
  await new Promise(resolve => setTimeout(resolve, 600));

  const lower = organism.toLowerCase();

  // Simple keyword matching logic
  if (lower.includes('yeast') || lower.includes('cerevisiae') || lower.includes('pombe') || lower.includes('candida')) {
    return RECIPES['yeast'];
  }
  
  if (lower.includes('minimal') || lower.includes('auxotroph')) {
    return RECIPES['minimal'];
  }

  // Default to LB for E. coli and others
  const recipe = { ...RECIPES['default'] };
  if (lower !== "e. coli" && lower !== "escherichia coli") {
    recipe.description = `Standard growth medium suitable for ${organism}.`;
  }
  
  return recipe;
};

export const getGenomeInfo = async (organism: string): Promise<GenomeInfo> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  // Construct a real dynamic link to NCBI
  const encodedOrg = encodeURIComponent(organism);
  
  return {
    organismName: organism,
    isAvailable: true, // Assume available for the sake of the tool helper
    ncbiLink: `https://www.ncbi.nlm.nih.gov/genome/?term=${encodedOrg}`,
    summary: `Search results for the ${organism} genome are available in the NCBI Genome database. Click the link below to view specific assemblies, annotations, and sequences.`,
    genomeSize: "Variable"
  };
};

// Stub for the removed feature to prevent import errors if referenced elsewhere (though references removed)
export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  return base64Image;
};