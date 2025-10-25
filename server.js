import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Selvitetään hakemisto, jotta index.html löytyy myös Renderissä
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Palvellaan staattiset tiedostot (index.html ym.)
app.use(express.static(__dirname));

// 🔹 Chatbot API
app.post("/api/ask", async (req, res) => {
  const question = req.body.question;

  console.log("🟢 Saatiin kysymys:", question);
  console.log("🔐 OpenAI-avain asetettu:", !!process.env.OPENAI_API_KEY);

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OpenAI API key puuttuu Renderista!");
    return res.json({ answer: "Palvelimella ei ole API-avainta asetettuna 😢" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Olet ystävällinen koira nimeltä Roki, joka auttaa löytämään sopivaa ruokaa koirille." },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();
    console.log("🟣 OpenAI vastaus:", data);

    const answer = data.choices?.[0]?.message?.content || "Roki ei saanut vastausta. 🐾";
    res.json({ answer });
  } catch (error) {
    console.error("🔥 Virhe OpenAI-haussa:", error);
    res.json({ answer: "Rokilla meni vähän pieleen... 😅" });
  }
});

// 🔹 Jos käyttäjä menee juureen "/", palautetaan index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Roki-palvelin toimii portissa ${PORT}`));
