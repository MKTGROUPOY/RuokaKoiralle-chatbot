// ask.js

export async function askRoki(question) {
  try {
    const response = await fetch("https://ruokakoiralle-chatbot.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("Virhe palvelimelta:", error);
    return "Roki ei valitettavasti saanut yhteyttä palvelimeen. Yritä hetken kuluttua uudelleen!";
  }
}
