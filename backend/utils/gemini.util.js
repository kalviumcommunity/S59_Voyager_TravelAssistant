import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. Gemini calls will fail until configured.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateText({ prompt, model = "gemini-1.5-flash", temperature = 0.7 }) {
  if (!genAI) {
    throw new Error("Gemini client not initialized. Set GEMINI_API_KEY env var.");
  }

  const genModel = genAI.getGenerativeModel({
    model,
    generationConfig: { temperature },
  });

  const result = await genModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function generateWithSystemAndUser({
  system,
  user,
  model = "gemini-1.5-flash",
  temperature = 0.7,
}) {
  if (!genAI) {
    throw new Error("Gemini client not initialized. Set GEMINI_API_KEY env var.");
  }

  const genModel = genAI.getGenerativeModel({
    model,
    generationConfig: { temperature },
  });

  const parts = [];
  if (system) {
    parts.push({ text: `SYSTEM\n${system}` });
  }
  if (user) {
    parts.push({ text: `USER\n${user}` });
  }

  const result = await genModel.generateContent(parts);
  const response = await result.response;
  return response.text();
}
