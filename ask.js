export async function askRoki(question) {
  const response = await fetch("https://ruokakoiralle-chatbot.onrender.com/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  return data.answer;
}
