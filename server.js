require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateAIResponse } = require('./services/aiService');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 AI Service is running!');
});

// ✅ AI endpoint
app.post('/ai', async (req, res) => {
  try {
    // Support both "prompt" and "promt"
    const content = req.body.prompt || req.body.promt;

    if (!content) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await generateAIResponse(content);
    res.json(result);
  } catch (error) {
    console.error('Error in /ai route:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
