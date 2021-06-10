import React from 'react';

import { IPlayerView } from '../@types';

const PlayersList: React.FC<IPlayerView> = ({ game }) => {
  return (
    <>
      {game.players &&
        game.players.map((player: { name: string; sign: string }, index: number) => (
          <div key={index}>
            <h3>
              {player.name}: "{player.sign}"
            </h3>
          </div>
        ))}
    </>
  );
};

export default PlayersList;
