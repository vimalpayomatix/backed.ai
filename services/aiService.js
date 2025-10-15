const axios = require('axios');

async function generateAIResponse(content) {
  const payload = {
    model: "llama-4-scout-17b-16e-instruct",
    stream: false,
    messages: [
      { role: "user", content }
    ],
    temperature: 0,
    max_tokens: -1,
    seed: 0,
    top_p: 1
  };

  try {
    const response = await axios.post(
      process.env.API_URL,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract the assistant's message text
    const aiMessage = response.data.choices?.[0]?.message?.content || '';

    return aiMessage;

  } catch (error) {
    console.error('AI Service Error:', error.response?.data || error.message);
    throw new Error(error.response?.data || error.message);
  }
}

module.exports = { generateAIResponse };
