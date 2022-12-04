/* eslint-disable no-new */
/* eslint-disable import/no-cycle */
/* eslint-disable no-plusplus */
import { Cell } from './Cell';
import { Colors } from './Colors';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';

/* eslint-disable import/prefer-default-export */
export class Board {
  cells: Cell[][] = [] // двумерный массив - матрица

  public initCells() {
    // !!!!Рекрусивнная зависимость, подумать о другой реализации
    // проходимся по строке
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []; // одномерный массив ячеек
      // проходимся по столбцам
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // добавляем черные ячейки
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // добавляем белые ячейки
        }
      }
      this.cells.push(row); // => получаем двумерный массив ячеек
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }

  // подсвечивание ячеек на которых возможен ход
  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  // получаем координаты ячейки
  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawn() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addKing() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  private addQueen() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addBishop() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private addKnight() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addRook() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  // расстановка фигур по ячейкам
  public addFigure() {
    this.addBishop();
    this.addKing();
    this.addKnight();
    this.addPawn();
    this.addQueen();
    this.addRook();
  }
}
