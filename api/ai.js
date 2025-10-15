const { generateAIResponse } = require('../services/aiService');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const content = req.body?.prompt || req.body?.promt;
    if (!content) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await generateAIResponse(content);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in api/ai:', error.message);
    return res.status(500).json({ error: error.message });
  }
};


