import express from "express";
import { generateLLM, zeroShotItinerary, oneShotItinerary, multiShotItinerary, mockGenerate, mockZeroShot, mockOneShot, mockMultiShot } from "../controllers/llm.controller.js";
import { logTokens } from "../middlewares/token.middleware.js";

const router = express.Router();

router.post("/llm/zero-shot", logTokens, zeroShotItinerary);
router.post("/llm/one-shot", logTokens, oneShotItinerary);
router.post("/llm/multi-shot", logTokens, multiShotItinerary);
router.post("/llm/generate", logTokens, generateLLM);

router.get("/mock/zero-shot", mockZeroShot);
router.get("/mock/one-shot", mockOneShot);
router.get("/mock/multi-shot", mockMultiShot);
router.get("/mock/generate", mockGenerate);

export default router;
