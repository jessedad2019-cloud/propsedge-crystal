import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, tag: process.env.BUILD_TAG || "LOCAL", guardian: true });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "PropsEdge Crystal API is alive." });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ API listening on port ${PORT}`);
});
