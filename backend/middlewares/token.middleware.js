import { encode } from "gpt-tokenizer";

export const logTokens = (req, res, next) => {
  try {
    const { prompt, rftc = {} } = req.body || {};
    const fullText = `
      System: ${rftc.systemContext ? JSON.stringify(rftc.systemContext) : ""}
      User: ${prompt || ""}
    `;

    const tokens = encode(fullText);
    req.tokenCount = tokens.length;

    console.log(`[Token Middleware] Tokens in request: ${req.tokenCount}`);
    next();
  } catch (err) {
    console.error("Token middleware error:", err);
    next();
  }
};
