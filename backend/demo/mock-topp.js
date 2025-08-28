// demo-topk-topp.js
import { generateText } from "../utils/gemini.util.js";

async function runDemo() {
  const prompt = "Suggest a futuristic 2-day travel plan for Kyoto.";

  // Conservative (low randomness)
  const conservative = await generateText({
    prompt,
    topK: 10,
    topP: 0.5,
    temperature: 0.7,
  });
  console.log("\n=== Conservative (topK=10, topP=0.5) ===");
  console.log(conservative);

  //Creative (high randomness)
  const creative = await generateText({
    prompt,
    topK: 100,
    topP: 0.95,
    temperature: 0.7,
  });
  console.log("\n=== Creative (topK=100, topP=0.95) ===");
  console.log(creative);
}

runDemo();
