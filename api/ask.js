import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { message } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Olet Roki, ystävällinen ja asiantunteva chatbot RuokaKoiralle.fi-sivustolle. Autat koiranomistajia valitsemaan oikean ruoan, vastaat kysymyksiin tuotteista ja ohjaat tarvittaessa verkkokauppaan.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
