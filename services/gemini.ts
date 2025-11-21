import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMediaRecipe = async (organism: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Create a growth media recipe for ${organism}.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mediaName: { type: Type.STRING },
          description: { type: Type.STRING },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                amount: { type: Type.NUMBER, description: "Amount for 1 Liter" },
                unit: { type: Type.STRING },
              },
            },
          },
          instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
      },
    },
  });
  
  return JSON.parse(response.text);
};

export const getGenomeInfo = async (organism: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Provide a short summary and genome size for the organism: ${organism}.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          organismName: { type: Type.STRING },
          summary: { type: Type.STRING },
          genomeSize: { type: Type.STRING, description: "Genome size (e.g. 4.6 Mb)" },
        },
      },
    },
  });

  const data = JSON.parse(response.text);
  // Construct a real dynamic link to NCBI
  const encodedOrg = encodeURIComponent(organism);
  
  return {
    ...data,
    isAvailable: true,
    ncbiLink: `https://www.ncbi.nlm.nih.gov/genome/?term=${encodedOrg}`,
  };
};