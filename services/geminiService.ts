
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmartReply = async (chatHistory: Message[]): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "Sorry, I can't generate a reply right now.";
  }

  const lastMessage = chatHistory[chatHistory.length - 1]?.text;
  if (!lastMessage) {
    return "What should I say?";
  }

  const prompt = `Based on the last message in a conversation: "${lastMessage}", suggest a short, casual reply.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: "You are a helpful assistant that suggests concise chat replies.",
          temperature: 0.7,
          maxOutputTokens: 20,
        }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating smart reply:", error);
    return "Could not generate a reply.";
  }
};
