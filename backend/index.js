require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const db = require('./db');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Sentiment = require('sentiment');
const sentimentAnalyzer = new Sentiment();

function analyzeReview(text) {
  // Run sentiment analysis
  const sentimentResult = sentimentAnalyzer.analyze(text);
  const score = sentimentResult.score;

  let sentiment = 'Neutral';
  if (score > 1) sentiment = 'Positive';
  else if (score < -1) sentiment = 'Negative';

  // Simple keyword extraction: keep words with 4+ letters
  const words = text
    .toLowerCase()
    .match(/\b\w{4,}\b/g) || [];
  const keywords = Array.from(new Set(words)).slice(0, 5);

  return {
    sentiment,
    keywords,
  };
}

// POST /api/reviews — receives review and returns real AI analysis
app.post('/api/reviews', async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid review text' });
  }

  try {
    const analysis = analyzeReview(text);

    const stmt = db.prepare(`
      INSERT INTO reviews (text, sentiment, keywords, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `);
    stmt.run(text, analysis.sentiment, analysis.keywords.join(', '));

    res.json(analysis);
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Failed to process review' });
  }
});

// Initialize database
app.listen(PORT, () => {
  console.log(`✅ Backend with AI running on http://localhost:${PORT}`);
});

// GET /api/reviews — returns all reviews
app.get('/api/reviews', (req, res) => {
  const reviews = db.prepare(`SELECT * FROM reviews ORDER BY created_at DESC`).all();
  res.json(reviews);
});