# AI Review Feedback App

A full-stack app that accepts product/service reviews, uses AI to analyze them, and provides an admin dashboard to view results.

## Features
- ReactJS frontend
- Node.js + SQLite backend
- Sentiment analysis using `sentiment` library
- Keyword extraction
- Admin dashboard with filter

## Folder Structure
- `/frontend` — React web UI
- `/backend` — API server using Express & SQLite

## How to Run

1. Clone the repo:
git clone https://github.com/your-username/review-feedback-app.git
cd review-feedback-app

2. Start the backend:
```bash
cd backend
npm install
node index.js

3. Start the frontend:
cd ../frontend
npm install
npm start