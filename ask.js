// ask.js
export async function askRoki(question) {
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    return data.answer || "Roki ei osannut vastata juuri nyt 🐾";
  } catch (error) {
    return "Roki ei saanut yhteyttä palvelimeen 😢";
  }
}
