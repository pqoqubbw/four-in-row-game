import React from 'react';

import { IResetButton } from '../@types';

const ResetButton: React.FC<IResetButton> = ({ clearBoard, clearField, children }) => {
  const handleClick = () => {
    clearBoard(0);
    clearField();
  };

  return (
    <button className='clearButton' onClick={handleClick}>
      {children}
    </button>
  );
};

export default ResetButton;
