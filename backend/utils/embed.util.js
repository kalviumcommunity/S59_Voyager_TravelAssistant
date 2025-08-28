import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const HF_KEY = process.env.HUGGINGFACE_API_KEY;
if (!HF_KEY) {
  throw new Error("Missing HUGGINGFACE_API_KEY in .env");
}

const hf = new InferenceClient(HF_KEY);

export async function generateEmbedding(text) {
  const model = "sentence-transformers/all-MiniLM-L6-v2";
  const res = await hf.featureExtraction({
    model,
    inputs: text,
  });
  return res;
}
