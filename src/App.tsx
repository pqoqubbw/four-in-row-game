import React from 'react';
import { Game, TicTacToe } from 'game-core';

import PlayersList from './components/PlayersList';
import GameView from './components/GameView';

import './App.css';

const game = new Game({
  playersList: ['Jackson', 'Alex'],
  strategy: new TicTacToe(),
  fieldSize: { x: 3, y: 3 },
});

const App: React.FC = () => {
  return (
    <div className='App'>
      <>
        <GameView game={game} />
        <PlayersList game={game} />
      </>
    </div>
  );
};

export default App;
