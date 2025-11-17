const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route to start a new game
app.post('/start-game', (req, res) => {
  // Initialize game state
  const gameState = {
    userCards: [],
    dealerCards: [],
    deck: initializeDeck(),
  };
  res.json(gameState);
});

// Route to deal a card to the user
app.post('/deal-user-card', (req, res) => {
  const { gameState } = req.body;
  const card = gameState.deck.pop();
  gameState.userCards.push(card);
  res.json(gameState);
});

// Route to deal a card to the dealer
app.post('/deal-dealer-card', (req, res) => {
  const { gameState } = req.body;
  const card = gameState.deck.pop();
  gameState.dealerCards.push(card);
  res.json(gameState);
});

// Function to initialize a deck of cards
function initializeDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'
  ];
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});