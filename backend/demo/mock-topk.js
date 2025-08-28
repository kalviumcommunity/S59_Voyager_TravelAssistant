import { generateText } from "../utils/gemini.util.js";

async function run() {
  console.log("Testing topK variation...\n");

  const prompt = "Suggest 3 unique restaurants in Tokyo for a foodie traveler.";

  console.log("\n🔹 Low topK (Conservative):");
  console.log(await generateText({ prompt, topK: 1, temperature: 0.3 }));

  console.log("\n🔹 Medium topK (Balanced):");
  console.log(await generateText({ prompt, topK: 40, temperature: 0.7 }));

  console.log("\n🔹 High topK (Creative):");
  console.log(await generateText({ prompt, topK: 80, temperature: 0.9 }));
}

run();
