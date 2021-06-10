import React from 'react';

const DrawBoard: React.FC<any> = ({ board, isError, handleClick, value }) => {
  let idCell = 0;

  return (
    <>
      {board &&
        board.map((trElement: (string | null)[], x: number) => (
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
    </>
  );
};

DrawBoard.defaultProps = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  isError: false,
  handleClick: () => console.error(new Error("Draw Board must have a props ' handleClick() '")),
};

export default React.memo(DrawBoard);
