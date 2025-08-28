import { InMemoryVectorStore } from "../store/vector.store.js";

(async () => {
  const vectorStore = new InMemoryVectorStore();

  await vectorStore.add("1", "Explore the historic temples of Kyoto");
  await vectorStore.add("2", "Relax on the beaches of Bali");
  await vectorStore.add("3", "Hike the Swiss Alps");

  const results = await vectorStore.searchText("mountain hiking in Switzerland");
  console.log("Search results:", results.map((r) => ({ text: r.text, score: r.score.toFixed(2) })));
})();
