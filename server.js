import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

// Tarvitaan, jotta saadaan nykyinen hakemisto ES-moduulissa
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Palvellaan index.html automaattisesti
app.use(express.static(__dirname));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API-reitti Rokille
app.post("/api/ask", async (req, res) => {
  const question = req.body.question;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Olet Roki, ystävällinen chatbot RuokaKoiralle.fi-verkkokaupasta. Autat asiakkaita löytämään sopivan ruoan heidän koiralleen." },
        { role: "user", content: question }
      ]
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Jotain meni pieleen Rokissa" });
  }
});

// Render näyttää index.html:n juuripolussa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(10000, () => console.log("🐶 Roki-palvelin toimii portissa 10000"));
