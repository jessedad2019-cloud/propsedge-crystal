// PropsEdge Crystal — Server Entry Point
// ======================================
// Express backend server with CORS + static file serving
// Works locally (localhost) and on Render for production.

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Resolve directory paths cleanly (ES module safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the built frontend (client/dist)
app.use(express.static(path.join(__dirname, "../client/dist")));

// Example API route (you can expand this later)
app.get("/api/status", (req, res) => {
  res.json({ message: "✅ PropsEdge Crystal backend active." });
});

// Catch-all — serve frontend for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Use Render-assigned port OR default to 5050 for local dev
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`✅ API listening on port ${PORT}`);
});
