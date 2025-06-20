const Database = require('better-sqlite3');

// Create or open database file
const db = new Database('reviews.db');

// Create a table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    sentiment TEXT,
    keywords TEXT,
    created_at TEXT
  );
`);

module.exports = db;
