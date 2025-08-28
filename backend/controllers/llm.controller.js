import { buildSystemPromptRFTC, buildUserPromptRFTC } from "../prompts.js";
import { generateWithSystemAndUser } from "../utils/gemini.util.js";
import axios from "axios";

export const generateLLM = async (req, res) => {
  try {
    const { prompt, model, rftc = {} } = req.body || {};

    const system = buildSystemPromptRFTC({
      role: "You are VoyagerAI, an expert travel planner.",
      format: "Return clear JSON blocks for each day and activity.",
      tone: "Helpful, concise, safety-aware.",
      constraints: "Do not fabricate facts; if unsure, say so.",
      context: rftc.systemContext || { source: "app-default" }
    });

    const user = buildUserPromptRFTC({
      role: "User",
      task: rftc.task || "Plan itinerary",
      format: rftc.format || "JSON with days and blocks.",
      tone: rftc.tone || "Friendly.",
      constraints: rftc.constraints || "Stay within realistic travel times.",
      context: rftc.userContext || {},
      message: prompt
    });

    const text = await generateWithSystemAndUser({ system, user, model });
    res.json({ text });
  } catch (err) {
    console.error("/api/llm/generate error", err);
    res.status(500).json({ error: "Failed to generate from Gemini" });
  }
};

export const mockGenerate = async (req, res) => {
  try {
    const { data } = await axios.post(
      `http://localhost:${process.env.PORT || 4000}/api/llm/generate`,
      {
        prompt: "Plan a 3-day itinerary for Paris",
        model: "gemini-1.5-flash",
        rftc: {
          task: "Create a detailed travel plan",
          tone: "Friendly",
          format: "Structured JSON",
          userContext: { travelerType: "solo" }
        }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    res.json({ mockResponse: data });
  } catch (err) {
    console.error("Mock generate error:", err.message);
    res.status(500).json({ error: "Mock call failed" });
  }
};
