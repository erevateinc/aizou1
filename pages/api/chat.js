import axios from 'axios';

export default async function handler(req, res) {
  const { message } = req.body;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "あなたはSupec Assistantとして振る舞います。" },
        { role: "user", content: message }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  res.status(200).json({ response: response.data.choices[0].message.content });
}