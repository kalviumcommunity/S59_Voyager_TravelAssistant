import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import llmRoutes from "./routes/llm.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", llmRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
