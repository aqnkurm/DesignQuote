// Backend server for quotes database
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Database file path
const DB_FILE = path.join(__dirname, 'quotes_db.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize database if it doesn't exist
function initializeDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ user: [] }));
    console.log('Database initialized');
  }
}

// Load quotes from database
function loadQuotes() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading quotes:', error);
    return { user: [] };
  }
}

// Save quotes to database
function saveQuotes(quotes) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(quotes, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving quotes:', error);
    return false;
  }
}

// Initialize database
initializeDatabase();

// API Routes

// Get all quotes
app.get('/api/quotes', (req, res) => {
  const quotes = loadQuotes();
  res.json(quotes);
});

// Get quotes by category
app.get('/api/quotes/:category', (req, res) => {
  const { category } = req.params;
  const quotes = loadQuotes();
  
  if (quotes[category]) {
    res.json(quotes[category]);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Add a new quote
app.post('/api/quotes', (req, res) => {
  const { text, author, category = 'user' } = req.body;
  
  if (!text || !author) {
    return res.status(400).json({ error: 'Quote text and author are required' });
  }
  
  const quotes = loadQuotes();
  
  // Create category if it doesn't exist
  if (!quotes[category]) {
    quotes[category] = [];
  }
  
  // Add new quote
  const newQuote = { text, author, category };
  quotes[category].push(newQuote);
  
  // Save to database
  if (saveQuotes(quotes)) {
    res.status(201).json(newQuote);
  } else {
    res.status(500).json({ error: 'Failed to save quote' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});