import React, { useCallback, useEffect, useState } from 'react';

import ResetButton from './ResetButton';
import NextPlayer from './NextPlayer';
import DrawBoard from './DrawBoard';

import { IFieldViewProps, IUpdateData } from 'game-core/dist/@types/types';
import { IPlayerView } from '../@types';

const FieldView: React.FC<IPlayerView> = ({ game }) => {
  const { x, y } = game.field.size;
  const [board, setBoard] = useState<(string | null)[][]>([]);
  const [isError, setIsError] = useState(false);

  const [winnerName, setWinnerName] = useState('');
  const showWin = (winner: string): void => {
    setWinnerName(winner);
  };

  const setViewBoard = useCallback((): void => {
    setBoard([]);
    for (let i = 0; i < x; ++i) {
      setBoard((state) => [...state, new Array(y).fill(null)]);
    }
  }, [x, y]);

  useEffect(() => {
    setViewBoard();

    game.on.subscribe('move', ({ x, y }) => game.makeMove({ x, y }));
    game.on.subscribe('update', ({ x, y, sign }: IUpdateData) => updateCell({ x, y, sign }));
    game.on.subscribe('win', (winner: string) => showWin(winner));
    game.on.subscribe('draw', (winner: string) => showWin(winner));
  }, [game, game.on, setViewBoard]);

  const updateCell = ({ x, y, sign }: IUpdateData) => {
    setBoard((state) => {
      state[x][y] = sign;
      return [...state];
    });
  };

  const errorMove = (): void => {
    setIsError(true);
  };

  const clearField = () => {
    setViewBoard();
    setWinnerName('');
    setIsError(false);
  };

  const handleClick = ({ x, y }: IFieldViewProps) => {
    if (!board[x][y] && !game.isFinished) {
      setIsError(false);
      game.on.trigger('move', { x, y });
    } else {
      errorMove();
    }
  };

  let idCell = 0;
  return (
    <>
      <NextPlayer
        players={game.gameInfo.playersList}
        currentPlayerIndex={game.currentPlayerIndex}
      />
      <table className='table-bordered'>
        <tbody>
          <DrawBoard board={board} idCell={idCell} isError={isError} handleClick={handleClick} />
        </tbody>
      </table>
      <ResetButton clearBoard={() => game.clearBoard(0)} clearField={clearField}>
        reset game
      </ResetButton>
      <div className='winnerText'>{game.isFinished ? `${winnerName} wins` : ''}</div>
    </>
  );
};

export default React.memo(FieldView);
