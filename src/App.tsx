import React from 'react';
import { Game } from 'game-core';

import PlayersList from './components/PlayersList';
import GameView from './components/GameView';

import FourInRow from './FourInRowStrategy/FourInRow';

import './App.css';

const fourInRow = new Game({
  playersList: ['Jackson', 'Alex'],
  strategy: new FourInRow(),
  fieldSize: { x: 6, y: 7 },
});

const App: React.FC = () => {
  return (
    <div className='App'>
      <div>
        <h1>FourInRow Game</h1>
      </div>
      <GameView game={fourInRow} />
      <PlayersList game={fourInRow} />
    </div>
  );
};

export default App;
