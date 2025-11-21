// @ts-nocheck

// Simulation Service to ensure app works without configuration errors in static hosting
const GeminiService = {
  getMediaRecipe: async (organism) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const orgLower = organism.toLowerCase();
    
    // Context-aware Logic
    if (orgLower.includes('yeast') || orgLower.includes('cerevisiae')) {
      return {
        mediaName: "YPD Broth (YEPD)",
        description: "Complete medium for yeast growth.",
        ingredients: [
          { name: "Yeast Extract", amount: 10, unit: "g" },
          { name: "Peptone", amount: 20, unit: "g" },
          { name: "Dextrose (Glucose)", amount: 20, unit: "g" },
          { name: "Distilled Water", amount: 1, unit: "L" }
        ],
        instructions: [
          "Dissolve ingredients in 900ml water.",
          "Adjust volume to 1L.",
          "Autoclave at 121°C for 15 minutes."
        ]
      };
    } else if (orgLower.includes('coli') || orgLower.includes('bacteria')) {
      return {
        mediaName: "Lysogeny Broth (LB)",
        description: "Standard rich medium for E. coli growth.",
        ingredients: [
          { name: "Tryptone", amount: 10, unit: "g" },
          { name: "Yeast Extract", amount: 5, unit: "g" },
          { name: "NaCl", amount: 10, unit: "g" },
          { name: "Distilled Water", amount: 1, unit: "L" }
        ],
        instructions: [
          "Add ingredients to 950ml distilled water.",
          "Adjust pH to 7.0 with NaOH.",
          "Top up to 1 Liter.",
          "Autoclave at 121°C for 20 mins."
        ]
      };
    } else {
      return {
        mediaName: `General Growth Medium for ${organism}`,
        description: "Standard nutrient broth formulation.",
        ingredients: [
          { name: "Peptone", amount: 5, unit: "g" },
          { name: "Beef Extract", amount: 3, unit: "g" },
          { name: "Distilled Water", amount: 1, unit: "L" }
        ],
        instructions: [
          "Dissolve components in water.",
          "Adjust pH to 6.8 - 7.2.",
          "Sterilize by autoclaving at 121°C."
        ]
      };
    }
  },

  getGenomeInfo: async (organism) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const orgLower = organism.toLowerCase();
    let size = "Unknown";
    let summary = `Genome data is indexed in the NCBI database for ${organism}.`;

    if (orgLower.includes('coli')) {
      size = "4.6 Mb";
      summary = "Escherichia coli K-12 is a model organism with a circular genome.";
    } else if (orgLower.includes('yeast') || orgLower.includes('cerevisiae')) {
      size = "12.1 Mb";
      summary = "Saccharomyces cerevisiae was the first eukaryote to have its genome sequenced.";
    } else if (orgLower.includes('subtilis')) {
      size = "4.2 Mb";
      summary = "Bacillus subtilis is a Gram-positive bacterium model organism.";
    }

    return {
      organismName: organism,
      summary: summary,
      genomeSize: size,
      isAvailable: true,
      ncbiLink: `https://www.ncbi.nlm.nih.gov/genome/?term=${encodeURIComponent(organism)}`
    };
  }
};

window.GeminiService = GeminiService;