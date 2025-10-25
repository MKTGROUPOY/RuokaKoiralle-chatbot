import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

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
          { role: "system", content: "Olet ystävällinen koira nimeltä Roki, joka vastaa ruuasta ja koirista." },
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Serveri käynnissä portissa ${PORT}`));
