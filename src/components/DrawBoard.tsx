import React from 'react';

const DrawBoard: React.FC<any> = ({ board, idCell, isError, handleClick }) => {
  return (
    <>
      {board &&
        board.map((trElement: (string | null)[], x: number) => (
          <tr key={idCell}>
            {trElement &&
              trElement.map((symbol: string | null, y: number) => (
                <td
                  key={idCell}
                  className={`cell ${isError ? 'error' : ''}`}
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
  idCell: 0,
  isError: false,
  handleClick: () => console.error(new Error("Draw Board must have a props ' handleClick() '")),
};

export default React.memo(DrawBoard);
