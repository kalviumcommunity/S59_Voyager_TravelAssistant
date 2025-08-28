import express from "express";
import { generateLLM, mockGenerate } from "../controllers/llm.controller.js";

const router = express.Router();

router.post("/llm/generate", generateLLM);
router.get("/mock/generate", mockGenerate);

export default router;
