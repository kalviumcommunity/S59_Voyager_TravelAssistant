import express from "express";
import { generateLLM, zeroShotItinerary, oneShotItinerary, multiShotItinerary, mockGenerate, mockZeroShot, mockOneShot, mockMultiShot } from "../controllers/llm.controller.js";

const router = express.Router();

router.post("/llm/zero-shot", zeroShotItinerary);
router.post("/llm/one-shot", oneShotItinerary);
router.post("/llm/multi-shot", multiShotItinerary);
router.post("/llm/generate", generateLLM);

router.get("/mock/zero-shot", mockZeroShot);
router.get("/mock/one-shot", mockOneShot);
router.get("/mock/multi-shot", mockMultiShot);
router.get("/mock/generate", mockGenerate);

export default router;
