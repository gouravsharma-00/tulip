// pages/api/solve-nptel.js
import Tesseract from 'tesseract.js';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ques, key } = req.body;

    if (!Array.isArray(ques) || !key) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // 1. OCR for each image
    const ocrResults = await Promise.all(
      ques.map(async (url) => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
          logger: (m) => console.log(m), // optional: log progress
        });

        return text;
      })
    );

    // 2. Prepare Gemini API requests
    const geminiResponses = await Promise.all(
      ocrResults.map(async (questionText) => {
        const response = await fetch('https://api.gemini.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: 'gemini-1', // or your desired model
            prompt: `Answer this multiple-choice question: ${questionText}\nReturn the correct options as an array of numbers only.`,
            max_tokens: 50,
          }),
        });

        const data: any = await response.json();
        // Extract text output
        const answerText = data?.choices?.[0]?.text || '';
        
        // Parse numbers from answer, e.g., "1,2" -> [1,2]
        const numbers = answerText.match(/\d+/g)?.map(Number) || [];
        return numbers;
      })
    );

    res.status(200).json({ result: geminiResponses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
