export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface MediaRecipe {
  mediaName: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
}

export interface GenomeInfo {
  organismName: string;
  isAvailable: boolean;
  ncbiLink?: string;
  summary: string;
  genomeSize?: string;
}

export enum AppTab {
  ORGANISM = 'ORGANISM',
  VISION = 'VISION'
}
