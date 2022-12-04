/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureName } from './Figure';
import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';

export class Pawn extends Figure {
  isFirstStep: boolean;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureName.PAWN;
    this.isFirstStep = true;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    // варианты хода
    if (((target.y === this.cell.y + direction)
    || (this.isFirstStep && (target.y === this.cell.y + firstStepDirection)))
    && target.x === this.cell.x
    && this.cell.board.getCell(target.x, target.y).isEmpty()) {
      return true;
    }

    // атака по диагонали
    if ((target.y === this.cell.y + direction)
    && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
    && this.cell.isEnemy(target)) {
      return true;
    }

    return false;
  }

  moveFigure() {
    super.moveFigure();
    this.isFirstStep = false;
  }
}
