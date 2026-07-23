const axios = require('axios');

// Uses Groq's OpenAI-compatible chat completions endpoint.
// Get a free key at https://console.groq.com
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function generateSummary(title, genre, year) {
  if (!process.env.AI_API_KEY) {
    throw new Error('AI_API_KEY is missing from backend/.env');
  }

  const prompt =
    `Write a short, engaging 2-3 sentence synopsis for the movie "${title}" ` +
    `(${genre}, ${year}). No spoilers. Keep it under 60 words.`;

  const response = await axios.post(
    GROQ_URL,
    {
      model: process.env.AI_MODEL || 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const text = response.data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('AI response did not contain a summary');
  }

  return text.trim();
}

module.exports = { generateSummary };
