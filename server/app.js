import express from "express";
import fetch from "node-fetch";
import Tesseract from "tesseract.js";

const app = express();
app.use(express.json({ limit: "10mb" }));

// Helper: fetch remote image as buffer
async function fetchImageBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

app.post("/app", async (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: "Expected { urls: string[] }" });
    }

    const results = [];

    for (const url of urls) {
      try {
        console.log(`Processing: ${url}`);
        const buffer = await fetchImageBuffer(url);

        const { data: { text } } = await Tesseract.recognize(buffer, "eng");

        results.push([text.trim()]);
      } catch (err) {
        results.push(`Error processing ${url}: ${err.message}`);
      }
    }

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(8080, () => {
  console.log(`🚀 OCR server running on http://localhost:${8080}`);
});
