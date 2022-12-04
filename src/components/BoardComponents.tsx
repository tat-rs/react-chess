/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComponents from './CellComponents';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

function BoardComponents({ board, setBoard }: BoardProps) {
  console.log(setBoard);

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (cell.figure) {
      setSelectedCell(cell);
    }
  }

  return (
    <div className="board">
      {
      board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {
            row.map((cell) => (
              <CellComponents
                click={(select) => click(select)}
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            ))
          }
        </React.Fragment>
      ))
      }
    </div>
  );
}

export default BoardComponents;
