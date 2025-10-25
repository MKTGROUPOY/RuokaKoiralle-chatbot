import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// testivastaus jos ei api keytä
if (!GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY puuttuu. Käytetään testivastauksia.");
}

// =====================
// API endpoint
// =====================
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;
  console.log("Saatiin kysymys:", question);

  if (!GEMINI_API_KEY) {
    return res.json({
      answer: "Hau! Olen Roki – vielä testiversio ilman Gemini API:a 🐾",
    });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
        }),
      }
    );

    const data = await geminiResponse.json();
    console.log("Gemini vastaus:", data);

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Roki ei saanut vastausta. 🐾";

    res.json({ answer });
  } catch (error) {
    console.error("Virhe Geminissä:", error);
    res.status(500).json({ answer: "Virhe Rokin yhteydessä Geminiin. 🐾" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Roki-palvelin toimii portissa ${PORT}`);
});
