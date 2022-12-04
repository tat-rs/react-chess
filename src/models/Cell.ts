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

  public moveFigure(target: Cell) {
    // target - ячейка на которую хотим сделать перемещение
    if (this.figure && this.figure.canMove(target)) {
      this.figure?.moveFigure(target);
      target.figure = this.figure;
      this.figure = null;
    }
  }
}
