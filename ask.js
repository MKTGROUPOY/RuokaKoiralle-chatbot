export async function askRoki(question) {
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error("Virhe palvelimessa");
    }

    const data = await response.json();
    return data.answer || "Roki ei saanut vastausta 🐾";
  } catch (err) {
    console.error("Roki-virhe:", err);
    return "Roki ei vastaa juuri nyt. Tarkista yhteys 🐾";
  }
}
