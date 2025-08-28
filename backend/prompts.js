export function buildSystemPromptRFTC({
  role = "You are VoyagerAI, an expert travel planner.",
  format = "Return clear JSON blocks for each day and activity.",
  tone = "Helpful, concise, safety-aware.",
  constraints = "Do not fabricate facts; if unsure, say so.",
  context = "Plan itineraries grounded in real-world travel patterns."
} = {}) {
  return [
    `ROLE: ${role}`,
    `FORMAT: ${format}`,
    `TONE: ${tone}`,
    `CONSTRAINTS: ${constraints}`,
    `CONTEXT: ${context}`
  ].join("\n");
}

export function buildUserPromptRFTC({
  role = "User",
  task = "Plan my trip.",
  format = "JSON with days and blocks.",
  tone = "Friendly.",
  constraints = "Stay within realistic travel times.",
  context = {},
  message
} = {}) {
  const contextJson = JSON.stringify(context || {}, null, 2);
  return [
    `ROLE: ${role}`,
    `TASK: ${task}`,
    `FORMAT: ${format}`,
    `TONE: ${tone}`,
    `CONSTRAINTS: ${constraints}`,
    `CONTEXT: ${contextJson}`,
    message ? `MESSAGE: ${message}` : null
  ].filter(Boolean).join("\n");
}
