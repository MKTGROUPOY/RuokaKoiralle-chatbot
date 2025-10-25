// ask.js

import OpenAI from "https://cdn.jsdelivr.net/npm/openai@4.13.0/+esm";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Turvallinen, haetaan GitHub Secretsistä
  dangerouslyAllowBrowser: true
});

export async function askRoki(question) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Olet Roki, ystävällinen chatbot RuokaKoiralle.fi-verkkokaupasta. Autat asiakkaita löytämään sopivan ruoan heidän koiralleen." },
      { role: "user", content: question }
    ]
  });

  return completion.choices[0].message.content;
}
