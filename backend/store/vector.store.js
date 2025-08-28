import { generateEmbedding } from "../utils/embed.util.js";

export class InMemoryVectorStore {
  constructor() {
    this.store = []
  }

  async add(id, text) {
    const embedding = await generateEmbedding(text);
    this.store.push({ id, text, embedding });
  }

  search(queryEmbedding, k = 3) {
    return this.store
      .map((item) => ({
        ...item,
        score: cosineSimilarity(item.embedding, queryEmbedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }

  async searchText(queryText, k = 3) {
    const queryEmbedding = await generateEmbedding(queryText);
    return this.search(queryEmbedding, k);
  }
}

function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (magA * magB);
}