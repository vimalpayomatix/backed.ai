const { generateAIResponse } = require('../services/aiService');

module.exports = async function handler(req, res) {
  // CORS preflight support and permissive CORS headers for testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, route: '/api/ai', method: 'GET' });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (_) {}
    }

    const content = body?.prompt || body?.promt;
    if (!content) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!process.env.API_URL || !process.env.API_KEY) {
      return res.status(500).json({ error: 'Server not configured: missing API_URL or API_KEY' });
    }

    const result = await generateAIResponse(content);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in api/ai:', error.message);
    return res.status(500).json({ error: error.message });
  }
};


