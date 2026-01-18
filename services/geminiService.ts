
import { GoogleGenAI } from "@google/genai";

export const askGemini = async (prompt: string) => {
  // Use process.env.API_KEY directly without fallbacks as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly and professional tech support assistant for 'BaBu SAHAB POS'. You help users understand the benefits of this application. If a user complains that the APK is not sending or downloading, explain that you are an AI assistant providing the website code, and the shop owner needs to physically upload their 'app-release.apk' file to their web server/hosting folder for the buttons to work. You can respond in English or Bengali. Use a helpful, polite tone.",
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Please try again later!";
  }
};
