/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureName } from './Figure';
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureName.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const isVerticalMove = (target.x === this.cell.x) && (target.y === this.cell.y + 1 || target.y === this.cell.y - 1);

    const isHorizontalMove = (target.y === this.cell.y) && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1);

    const isDiagonalMove = (((target.y === this.cell.y - 1) && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1))
                            || ((target.y === this.cell.y + 1) && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)));

    if (isVerticalMove || isHorizontalMove || isDiagonalMove) {
      return true;
    }

    return false;
  }
}
