import { generateEmbedding } from "../utils/embed.util.js";

export class InMemoryVectorStore {
  constructor() {
    this.store = [];
  }

  async add(id, text) {
    try {
      const embedding = await generateEmbedding(text);
      if (!Array.isArray(embedding) || !embedding.length) {
        console.error(`Failed to generate valid embedding for: "${text}"`);
        return;
      }
      this.store.push({ id, text, embedding });
    } catch (err) {
      console.error(`Error adding text to store: ${err.message}`);
    }
  }

  async searchText(query, topK = 3) {
    if (!query || typeof query !== "string") {
      throw new Error("Query must be a non-empty string");
    }

    if (!this.store.length) {
      console.warn("Vector store is empty, no search results.");
      return [];
    }

    let queryEmbedding;
    try {
      queryEmbedding = await generateEmbedding(query);
    } catch (err) {
      console.error(`Error generating query embedding: ${err.message}`);
      return [];
    }

    if (!Array.isArray(queryEmbedding) || !queryEmbedding.length) {
      console.error("Invalid query embedding generated.");
      return [];
    }

    const scored = this.store.map((entry) => ({
      ...entry,
      score: cosineSimilarity(queryEmbedding, entry.embedding),
    }));

    return scored
      .filter((e) => e.score > 0) 
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}

function cosineSimilarity(vecA, vecB) {
  if (!vecA?.length || !vecB?.length) return 0;
  if (vecA.length !== vecB.length) {
    console.warn("Embedding dimension mismatch, returning similarity 0.");
    return 0;
  }

  let dot = 0,
    magA = 0,
    magB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] ** 2;
    magB += vecB[i] ** 2;
  }

  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);

  if (magA === 0 || magB === 0) {
    console.warn("Zero-magnitude embedding detected.");
    return 0;
  }

  return dot / (magA * magB);
}