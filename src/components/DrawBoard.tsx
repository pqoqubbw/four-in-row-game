import React from 'react';

import { IDrawBoardProps } from '../@types';

const DrawBoard: React.FC<IDrawBoardProps> = ({ board, isError, handleClick }) => {
  let idCell = 0;

  return (
    <>
      {!board ? (
        <div>something goes wrong, sorry!</div>
      ) : (
        <table className='table-bordered'>
          <tbody>
            {board.map((trElement: (string | null)[], x: number) => (
              <tr key={idCell}>
                {trElement &&
                  trElement.map((symbol: string | null, y: number) => (
                    <td
                      key={idCell}
                      className={`cell ${isError ? 'error' : ''} ${symbol ? `${symbol}` : ''}`}
                      id={String(idCell++)}
                      tabIndex={1}
                      onClick={() => handleClick({ x, y })}>
                      {symbol}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

DrawBoard.defaultProps = {
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  isError: false,
  handleClick: () => console.error(new Error("Draw Board must have a props ' handleClick() '")),
};

export default React.memo(DrawBoard);
