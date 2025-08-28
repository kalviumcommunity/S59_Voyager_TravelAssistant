import axios from "axios";

import { buildSystemPromptRFTC, buildUserPromptRFTC } from "../prompts.js";
import { generateWithSystemAndUser } from "../utils/gemini.util.js";
import { ONE_SHOT_EXAMPLE, MULTI_SHOT_EXAMPLES } from "../static/promptExamples.js";

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

// ====== ZERO SHOT ======
export const zeroShotItinerary = async (req, res) => {
  try {
    const { prompt, model = "gemini-1.5-flash" } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "A prompt is required" });

    const system = "You are a helpful travel assistant.";
    const user = prompt;

    const text = await generateWithSystemAndUser({ system, user, model });
    res.json({ text });
  } catch (err) {
    console.error("/api/llm/zero-shot error", err);
    res.status(500).json({ error: "Failed to generate zero-shot itinerary" });
  }
};

export const oneShotItinerary = async (req, res) => {
  try {
    const { prompt, model = "gemini-1.5-flash" } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "A prompt is required" });

    const system = "You are a skilled travel planner. Use the example to guide tone and structure.";
    const user = `${ONE_SHOT_EXAMPLE}\n\nUser Request: ${prompt}`;

    const text = await generateWithSystemAndUser({ system, user, model });
    res.json({ text });
  } catch (err) {
    console.error("/api/llm/one-shot error", err);
    res.status(500).json({ error: "Failed to generate one-shot itinerary" });
  }
};

export const multiShotItinerary = async (req, res) => {
  try {
    const { prompt, model = "gemini-1.5-flash" } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "A prompt is required" });

    const system = "You are a highly skilled travel planner. Use the examples to ensure structured, consistent responses.";
    const user = `${MULTI_SHOT_EXAMPLES}\n\nUser Request: ${prompt}`;

    const text = await generateWithSystemAndUser({ system, user, model });
    res.json({ text });
  } catch (err) {
    console.error("/api/llm/multi-shot error", err);
    res.status(500).json({ error: "Failed to generate multi-shot itinerary" });
  }
};

// ====== MOCK ENDPOINTS ======
export const mockGenerate = async (req, res) => {
  try {
    const { data } = await axios.post(
      `http://localhost:${process.env.PORT || 4000}/api/llm/generate`,
      {
        prompt: "Plan a 3-day itinerary for Paris",
        model: "gemini-1.5-flash",
        rftc: { task: "Create a detailed travel plan", tone: "Friendly", format: "Structured JSON", userContext: { travelerType: "solo" } }
      }
    );
    res.json({ mockResponse: data });
  } catch (err) {
    console.error("Mock generate error:", err.message);
    res.status(500).json({ error: "Mock call failed" });
  }
};

export const mockZeroShot = async (req, res) => {
  try {
    const { data } = await axios.post(
      `http://localhost:${process.env.PORT || 4000}/api/llm/zero-shot`,
      { prompt: "Plan a 3-day trip to Kyoto focusing on temples, gardens, and local cuisine.", model: "gemini-1.5-flash" }
    );
    res.json({ mockResponse: data });
  } catch (err) {
    console.error("Mock zero-shot error:", err.message);
    res.status(500).json({ error: "Mock zero-shot call failed" });
  }
};

export const mockOneShot = async (req, res) => {
  try {
    const { data } = await axios.post(
      `http://localhost:${process.env.PORT || 4000}/api/llm/one-shot`,
      { prompt: "Plan a 2-day trip to Rome focusing on history and local cafes.", model: "gemini-1.5-flash" }
    );
    res.json({ mockResponse: data });
  } catch (err) {
    console.error("Mock one-shot error:", err.message);
    res.status(500).json({ error: "Mock one-shot call failed" });
  }
};

export const mockMultiShot = async (req, res) => {
  try {
    const { data } = await axios.post(
      `http://localhost:${process.env.PORT || 4000}/api/llm/multi-shot`,
      { prompt: "Plan a 4-day trip to Istanbul focusing on history, markets, and local cuisine.", model: "gemini-1.5-flash" }
    );
    res.json({ mockResponse: data });
  } catch (err) {
    console.error("Mock multi-shot error:", err.message);
    res.status(500).json({ error: "Mock multi-shot call failed" });
  }
};
