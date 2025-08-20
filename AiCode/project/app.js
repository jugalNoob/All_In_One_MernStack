const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
console.log("🔑 DeepSeek API Key loaded:", DEEPSEEK_API_KEY ? "Yes" : "No");

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat", // valid model name per docs :contentReference[oaicite:1]{index=1}
        messages: [{ role: "user", content: question }],
        max_tokens: 200,
        stream: false
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    if (err.response) {
      console.error("DeepSeek API error:", err.response.status, err.response.data);
      res.status(err.response.status).json(err.response.data);
    } else {
      console.error("DeepSeek error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

app.listen(9000, () => {
  console.log("🚀 DeepSeek LLM app running on http://localhost:9000");
});
