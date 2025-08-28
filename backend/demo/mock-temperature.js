import { generateWithSystemAndUser } from "../utils/gemini.util.js"; 
import dotenv from "dotenv";

dotenv.config();

async function run() {
  const factual = await generateWithSystemAndUser({
    system: "You are a precise travel planner.",
    user: "Plan a 3-day trip to Kyoto.",
    temperature: 0.1
  });

  const creative = await generateWithSystemAndUser({
    system: "You are a creative travel planner with flair.",
    user: "Plan a 3-day trip to Kyoto.",
    temperature: 1.2
  });

  console.log("\n=== Factual Response (Temp 0.1) ===\n", factual);
  console.log("\n=== Creative Response (Temp 1.2) ===\n", creative);
}

run().catch(console.error);
