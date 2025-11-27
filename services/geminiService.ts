import { GoogleGenAI, Type } from "@google/genai";
import { Song, AIAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Function to analyze a song for musicians
export const analyzeSongForMusician = async (song: Song): Promise<AIAnalysis> => {
  if (!apiKey) {
    return {
      description: "Please configure your API Key to use AI features.",
      musicalKey: "N/A",
      tempo: "N/A",
      technicalTips: "API Key missing."
    };
  }

  const prompt = `
    Analyze this song from a musician's perspective.
    Title: ${song.title}
    Artist: ${song.artist}
    Genre: ${song.genre}
    Moods: ${song.mood?.join(', ')}
    
    Provide the output in JSON format with the following fields:
    - description: A short, creative description of the song's vibe in Thai (approx 50 words).
    - musicalKey: An estimated musical key (e.g., C Major, A Minor) based on the genre and title vibes.
    - tempo: An estimated BPM range.
    - technicalTips: 1-2 sentences in Thai giving advice to a musician who wants to learn this style.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            musicalKey: { type: Type.STRING },
            tempo: { type: Type.STRING },
            technicalTips: { type: Type.STRING },
          },
          required: ["description", "musicalKey", "tempo", "technicalTips"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysis;

  } catch (error) {
    console.error("Error analyzing song:", error);
    return {
      description: "ไม่สามารถวิเคราะห์เพลงได้ในขณะนี้",
      musicalKey: "Unknown",
      tempo: "Unknown",
      technicalTips: "ลองใหม่อีกครั้งภายหลัง"
    };
  }
};

// Function to generate a playlist suggestion based on a user prompt
export const recommendSongs = async (userPrompt: string, allSongs: Song[]): Promise<string[]> => {
    if (!apiKey) return [];
    
    const songListString = allSongs.map(s => `ID: ${s.id}, Title: ${s.title}, Artist: ${s.artist}, Genre: ${s.genre}, Mood: ${s.mood?.join(', ')}`).join('\n');

    const prompt = `
      User Request: "${userPrompt}"
      
      Available Songs:
      ${songListString}
      
      Select the IDs of the songs that best match the user's request. 
      Return ONLY a JSON object with an array of strings named "songIds".
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    songIds: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                }
            }
        }
      });
      
      const result = JSON.parse(response.text || '{"songIds": []}');
      return result.songIds;
    } catch (error) {
      console.error("Error recommending songs:", error);
      return [];
    }
};