import { MediaRecipe, GenomeInfo } from "../types.ts";

// --- Mock Services (No AI Dependency) ---

export const getMediaRecipe = async (organism: string): Promise<MediaRecipe> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    mediaName: "LB Broth (Luria-Bertani)",
    description: `Standard growth medium for ${organism} (Simulated Result)`,
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
  };
};

export const getGenomeInfo = async (organism: string): Promise<GenomeInfo> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    organismName: organism,
    isAvailable: true,
    ncbiLink: "https://www.ncbi.nlm.nih.gov/genome/",
    summary: `The full genome for ${organism} is available in the NCBI database. (This is a simulated response for demo purposes).`,
    genomeSize: "4.6 Mb"
  };
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // In demo mode, we just return the original image to simulate the "result" flow
  // since we cannot process images without the backend AI.
  return `data:${mimeType};base64,${base64Image}`;
};