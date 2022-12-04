/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Board } from './Board';
import { Colors } from './Colors';
import { Figure } from './figures/Figure';

/* Класс ячейки */

export class Cell {
  readonly x: number;

  readonly y: number;

  readonly color: Colors;

  figure: Figure | null;

  board: Board;

  available: boolean; // может ли фигура делать ход

  id: number;

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty() {
    return this.figure === null;
  }

  isEnemy(target: Cell) {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    // находим разницу между координатами выбранной ячейки и текущей
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX !== absY) {
      return false;
    }

    // направление движения
    const dx = this.x < target.x ? 1 : -1;
    const dy = this.y < target.y ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostFigure(figure: Figure) {
    if (figure.color === Colors.WHITE) {
      this.board.lostWhiteFigures.push(figure);
    } else {
      this.board.lostBlackFigures.push(figure);
    }
  }

  public moveFigure(target: Cell) {
    // target - ячейка на которую хотим сделать перемещение
    if (this.figure && this.figure.canMove(target)) {
      if (target.figure) {
        this.addLostFigure(target.figure);
      }
      this.figure?.moveFigure();
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
