import express from "express";
import { generateLLM,zeroShotItinerary, mockGenerate, mockZeroShot } from "../controllers/llm.controller.js";

const router = express.Router();

router.post("/llm/generate", generateLLM);
router.post("/llm/zero-shot", zeroShotItinerary);
router.get("/mock/zero-shot", mockZeroShot);
router.get("/mock/generate", mockGenerate);

export default router;
