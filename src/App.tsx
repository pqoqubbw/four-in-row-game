import React, { useState } from 'react';
import { Game, TicTacToe } from 'game-core';

import PlayersList from './components/PlayersList';
import GameView from './components/GameView';

import './App.css';
import FourInRow from './FourInRowStrategy/FourInRow';

const ticTacToe = new Game({
  playersList: ['Jackson', 'Alex'],
  strategy: new TicTacToe(),
  fieldSize: { x: 3, y: 3 },
});

const fourInRow = new Game({
  playersList: ['Jackson', 'Alex'],
  strategy: new FourInRow(),
  fieldSize: { x: 6, y: 7 },
});

const App: React.FC = () => {
  const [game, setGame] = useState(ticTacToe);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'TicTacToe':
        setGame(fourInRow);
        break;

      case 'FourInRow':
        setGame(fourInRow);
        break;

      default:
        setGame(ticTacToe);
        break;
    }
  };

  return (
    <div className='App'>
      <label>
        Select game:
        <select onChange={(e) => handleChange(e)}>
          <option value='TicTacToe'>TicTacToe</option>
          <option value='FourInRow'>FourInRow</option>
        </select>
      </label>
      <>
        <GameView game={game} />
        <PlayersList game={game} />
      </>
    </div>
  );
};

export default App;
