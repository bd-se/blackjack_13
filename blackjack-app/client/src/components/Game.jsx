import React, { useState } from 'react';

function Game() {
  const [gameState, setGameState] = useState({
    userCards: [],
    dealerCards: [],
    deck: [],
  });

  const calculateTotal = (cards) => {
    let total = 0;
    let aces = 0;

    cards.forEach(card => {
      if (['Jack', 'Queen', 'King'].includes(card.value)) {
        total += 10;
      } else if (card.value === 'Ace') {
        aces += 1;
        total += 11;
      } else {
        total += parseInt(card.value);
      }
    });

    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }

    return total;
  };

  const determineWinner = () => {
    const userTotal = calculateTotal(gameState.userCards);
    const dealerTotal = calculateTotal(gameState.dealerCards);

    if (userTotal > 21) {
      return 'Dealer wins!';
    } else if (dealerTotal > 21) {
      return 'User wins!';
    } else if (userTotal > dealerTotal) {
      return 'User wins!';
    } else if (dealerTotal > userTotal) {
      return 'Dealer wins!';
    } else {
      return 'It\'s a tie!';
    }
  };

  const startGame = async () => {
    const response = await fetch('/start-game', { method: 'POST' });
    const newGameState = await response.json();
    setGameState(newGameState);
  };

  const dealUserCard = async () => {
    const response = await fetch('/deal-user-card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameState }),
    });
    const newGameState = await response.json();
    setGameState(newGameState);
  };

  const dealDealerCard = async () => {
    const response = await fetch('/deal-dealer-card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameState }),
    });
    const newGameState = await response.json();
    setGameState(newGameState);
  };

  return (
    <div>
      <h1>Blackjack Game</h1>
      <button onClick={startGame}>Start Game</button>
      <button onClick={dealUserCard}>Deal User Card</button>
      <button onClick={dealDealerCard}>Deal Dealer Card</button>
      <div>
        <h2>User Cards</h2>
        <ul>
          {gameState.userCards.map((card, index) => (
            <li key={index}>{card.value} of {card.suit}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Dealer Cards</h2>
        <ul>
          {gameState.dealerCards.map((card, index) => (
            <li key={index}>{card.value} of {card.suit}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Result</h2>
        <p>{determineWinner()}</p>
      </div>
    </div>
  );
}

export default Game;