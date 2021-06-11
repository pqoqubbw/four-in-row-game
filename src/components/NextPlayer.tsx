import React, { useEffect, useState } from 'react';

import { INextPlayerView } from '../@types';

const NextPlayerView: React.FC<INextPlayerView> = ({ currentPlayerIndex, players }) => {
  const [nextPlayer, setNextPlayer] = useState('');

  useEffect(() => {
    setNextPlayer(players[currentPlayerIndex]);
  }, [currentPlayerIndex, players]);

  return <div className='nextPlayer'>Next Player: {nextPlayer}</div>;
};

export default NextPlayerView;
