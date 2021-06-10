import React, { useState } from 'react';
import { Game, TicTacToe } from 'game-core';

import PlayersList from './components/PlayersList';
import GameView from './components/GameView';

import FourInRow from './FourInRowStrategy/FourInRow';

import './App.css';

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
  const [isTicTacToe, setTicTacToe] = useState(false);
  const [isFourInRow, setFourInRow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'TicTacToe':
        setTicTacToe(true);
        setFourInRow(false);
        break;

      case 'FourInRow':
        setTicTacToe(false);
        setFourInRow(true);
        break;

      default:
        setTicTacToe(true);
        setFourInRow(false);
        break;
    }
  };

  return (
    <div className='App'>
      <select onChange={(e) => handleChange(e)}>
        <option value='select'>select game</option>
        <option value='TicTacToe'>TicTacToe</option>
        <option value='FourInRow'>FourInRow</option>
      </select>
      {isTicTacToe && (
        <>
          <GameView game={ticTacToe} />
          <PlayersList game={ticTacToe} />
        </>
      )}
      {isFourInRow && (
        <>
          <GameView game={fourInRow} />
          <PlayersList game={fourInRow} />
        </>
      )}
    </div>
  );
};

export default App;
