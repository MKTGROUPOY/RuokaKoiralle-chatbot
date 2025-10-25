// server.js

import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // tämä haetaan GitHub Secretsistä
});

app.post("/ask", async (req, res) => {
  const question = req.body.question || "Hei Roki!";
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Olet Roki, ystävällinen asiantuntija RuokaKoiralle.fi-verkkokaupasta. Autat löytämään koirille oikean ruoan ja vastaat empaattisesti ja selkeästi." },
        { role: "user", content: question },
      ],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Roki ei nyt vastannut. Yritä uudelleen myöhemmin." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Roki-palvelin toimii portissa ${port}`));
