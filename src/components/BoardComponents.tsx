/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponents from './CellComponents';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
  currentPlayer: Player | null;
}

function BoardComponents({
  board, setBoard, swapPlayer, currentPlayer,
}: BoardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      swapPlayer();
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
    } else if (cell.figure?.color === currentPlayer?.color) {
      setSelectedCell(cell);
    }
  }

  // перерисовка доски
  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  // подсветка доступных ячеек
  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

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
