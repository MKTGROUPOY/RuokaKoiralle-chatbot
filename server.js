// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// API-reitti — vastaa testiviestillä
app.post("/api/ask", async (req, res) => {
  const question = req.body.question?.toLowerCase() || "";

  // Simppeleitä vastauksia testikäyttöön
  let answer = "Hau! Olen Roki – vielä testiversio ilman OpenAI:ta 🐾";

  if (question.includes("mitä kuuluu")) {
    answer = "Hau hau! Kiitos kysymästä, minulle kuuluu oikein hyvää! 🐶";
  } else if (question.includes("kuka olet")) {
    answer = "Olen Roki, RuokaKoiralle.fi:n oma apuribotti! Autan löytämään parhaan ruoan koirallesi 🍖";
  } else if (question.includes("kana")) {
    answer = "Tämä on testiversio, mutta voin pian etsiä sinulle tiedon siitä, sisältääkö ruoka kanaa 🐔";
  } else if (question.includes("hei")) {
    answer = "Hei sinä! 🐾 Kiva kun tulit juttelemaan Rokin kanssa!";
  }

  res.json({ answer });
});

// Näytetään index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Renderin portti
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🐶 Roki-palvelin toimii portissa ${PORT}`));
