import { generateEmbedding } from "../utils/embed.util.js";

async function runDemo() {
  const samples = [
    "Explore the Eiffel Tower in Paris",
    "Relax on the beaches of Bali",
    "Hike through the mountains of Kyoto",
  ];

  for (const text of samples) {
    const embedding = await generateEmbedding(text);
    console.log(`\nText: ${text}`);
    console.log(`Embedding length: ${embedding.length}`);
    console.log(`First 5 dims:`, embedding.slice(0, 5));
  }
}

runDemo();
