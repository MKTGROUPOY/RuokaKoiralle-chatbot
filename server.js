import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;
  
  // Mockattu vastaus ilman OpenAI-yhteyttä
  const fakeAnswers = [
    "Hau hau! Olen Roki, ruokakoirasi. 🐾",
    "Tänään tekee mieli nappuloita ja kanaa!",
    "Kiva kun kysyit, minulle kuuluu hyvää!",
    "Muistathan antaa vettä ja rapsutuksia!"
  ];
  
  // Valitaan satunnainen vastaus
  const answer = fakeAnswers[Math.floor(Math.random() * fakeAnswers.length)];
  
  res.json({ answer });
});

app.listen(10000, () => {
  console.log("🐶 Roki (mock-versio) kuuntelee portissa 10000");
});
