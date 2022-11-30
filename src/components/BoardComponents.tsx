/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Board } from '../models/Board';
import CellComponents from './CellComponents';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

function BoardComponents({ board, setBoard }: BoardProps) {
  console.log(setBoard);
  return (
    <div className="board">
      {
      board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {
            row.map((cell) => (
              <CellComponents cell={cell} key={cell.id} />
            ))
          }
        </React.Fragment>
      ))
      }
    </div>
  );
}

export default BoardComponents;
