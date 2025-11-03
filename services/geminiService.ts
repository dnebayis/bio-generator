
import { GoogleGenAI, Type } from '@google/genai';

// Assume process.env.API_KEY is available in the execution environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const promptTemplate = (displayName: string, keywords: string[]): string => `
You are a witty social media expert specializing in the Farcaster protocol. Your task is to generate 3 unique and compelling profile bios for a user.

User's Name: ${displayName}
Desired Tones: [${keywords.join(', ')}]

Constraints:
- Each bio must be 160 characters or less.
- The tone should be consistent with the desired tones.
- The bios should be creative and stand out on Farcaster.
- Do not use hashtags.
- Return the response as a valid JSON object with a single key "bios", which is an array of 3 strings.

Example for a user named 'v' with tone 'techie, degen':
{
  "bios": [
    "Building in the onchain arena. Shipping code and casting alpha. Probably nothing.",
    "Just a node in the decentralized graph. Here for the tech, staying for the memes.",
    "Exploring the edges of crypto, one farcast at a time. LFG."
  ]
}
`;

export const generateBios = async (displayName: string, keywords: string[]): Promise<string[]> => {
  const prompt = promptTemplate(displayName, keywords);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bios: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (result && Array.isArray(result.bios)) {
        return result.bios;
    } else {
        throw new Error("Invalid response format from Gemini API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate bios from Gemini API.");
  }
};
