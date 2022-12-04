/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import logoIcon from '../../assets/black-king.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

export enum FigureName {
  FIGURE = 'Фигура',
  KING = 'Король',
  KNIGHT = 'Конь',
  PAWN = 'Пешка',
  QUEEN = 'Ферзь',
  ROOK = 'Ладья',
  BISHOP = 'Слон',
}

export class Figure {
  color: Colors;

  logo: typeof logoIcon | null;

  cell: Cell;

  name: FigureName;

  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureName.FIGURE;
    this.id = Math.random();
  }

  // может ли двигаться фигура на ячейку
  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }

    if (target.figure?.name === FigureName.KING) {
      return false;
    }
    return true;
  }

  // перемещение фигуры
  /* moveFigure(target: Cell) {
    if (target.color === this.color) {
      return false;
    }
    return true;
  } */
}
