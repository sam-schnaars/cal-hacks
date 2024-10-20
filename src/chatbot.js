const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyCAPWbSDVMRzVhGINd693MAfZN1JZJBBKU");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ generated_text: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating content' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
