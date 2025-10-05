// app/api/solve-nptel/route.js
import Tesseract from 'tesseract.js';

export async function POST(req) {
  try {
    const { ques, key } = await req.json();

    if (!Array.isArray(ques) || !key) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
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
            model: 'gemini-1',
            prompt: `Answer this multiple-choice question: ${questionText}\nReturn the correct options as an array of numbers only.`,
            max_tokens: 50,
          }),
        });

        const data = await response.json();
        const answerText = data?.choices?.[0]?.text || '';
        const numbers = answerText.match(/\d+/g)?.map(Number) || [];
        return numbers;
      })
    );

    return new Response(
      JSON.stringify({ result: geminiResponses }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
