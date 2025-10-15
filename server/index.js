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

// === NPC SMART RESPAWN SYSTEM ===
import fs from "fs";

const npcDataFile = "./config/npcs.json"; // or wherever you store world state

function randomizeNPCs() {
  try {
    const npcData = JSON.parse(fs.readFileSync(npcDataFile));
    const randomized = npcData.map(npc => ({
      ...npc,
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000),
      state: "wandering"
    }));
    fs.writeFileSync(npcDataFile, JSON.stringify(randomized, null, 2));
    console.log("🎮 NPCs reshuffled for new session");
  } catch (err) {
    console.log("⚠️ No NPC data file found (skipping shuffle)");
  }
}

// Trigger respawn 10 seconds after startup
setTimeout(randomizeNPCs, 10000);
