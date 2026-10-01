export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { query } = req.body || {};

    if (!query) {
      return res.status(400).json({ error: "Mensagem vazia" });
    }

    const response = await fetch("https://api.dify.ai/v1/chat-messages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: {},
        query: query,
        response_mode: "blocking",
        user: "cybersafe-user"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({
      answer: data.answer
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao comunicar com o CyberSafe"
    });
  }
}
