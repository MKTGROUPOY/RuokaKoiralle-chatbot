import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

// Asetetaan polut oikein (ESM-tuki)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Palvellaan kaikki tiedostot (index.html, ask.js jne.)
app.use(express.static(__dirname));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔹 API: Rokin vastaus
app.post("/api/ask", async (req, res) => {
  const question = req.body.question;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Olet Roki, ystävällinen chatbot RuokaKoiralle.fi-verkkokaupasta. Autat asiakkaita löytämään sopivan ruoan heidän koiralleen ystävällisellä ja ymmärtäväisellä tavalla.",
        },
        { role: "user", content: question },
      ],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("Virhe Rokin API:ssa:", error);
    res.status(500).json({ error: "Jotain meni pieleen Rokissa 🐾" });
  }
});

// 🔹 Näytä index.html juuripolussa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔹 Render käyttää porttia automaattisesti (älä lukitse sitä 10000:een)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🐶 Roki toimii portissa ${PORT}`));
