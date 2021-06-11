import React, { useCallback, useEffect, useState } from 'react';

import ResetButton from './ResetButton';
import NextPlayer from './NextPlayer';
import DrawBoard from './DrawBoard';

import { IFieldViewProps, IUpdateData } from 'game-core/dist/@types/types';
import { IPlayerView } from '../@types';

import { subscribeActions } from '../constans';

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

    game.event.subscribe(subscribeActions.move, ({ x, y }: IFieldViewProps) =>
      game.makeMove({ x, y })
    );
    game.event.subscribe(subscribeActions.update, ({ x, y, sign }: IUpdateData) =>
      updateCell({ x, y, sign })
    );
    game.event.subscribe(subscribeActions.win, (winner: string) => showWin(winner));
    game.event.subscribe(subscribeActions.draw, (winner: string) => showWin(winner));

    return () => {
      clearField();
      game.clearBoard(0);
      game.event.events = {};
    };
  }, [game]);

  const updateCell = ({ x, y, sign }: IUpdateData) => {
    setBoard((state): (string | null)[][] => {
      for (let i = 5; i >= 0; i--) {
        if (state[i][y] === null) {
          state[i][y] = sign;
          break;
        }
      }
      return [...state];
    });
  };

  const clearField = (): void => {
    setViewBoard();
    setWinnerName('');
    setIsError(false);
  };

  const handleClick = ({ x, y }: IFieldViewProps) => {
    if (!board[x][y] && !game.isFinished) {
      setIsError(false);
      game.event.trigger(subscribeActions.move, { x, y });
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <NextPlayer
        players={game.gameInfo.playersList}
        currentPlayerIndex={game.currentPlayerIndex}
      />
      <DrawBoard board={board} isError={isError} handleClick={handleClick} />
      <ResetButton clearBoard={() => game.clearBoard(0)} clearField={clearField}>
        reset game
      </ResetButton>
      <div className='winnerText'>{game.isFinished ? `${winnerName} wins` : ''}</div>
    </>
  );
};

export default React.memo(FieldView);
