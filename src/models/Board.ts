/* eslint-disable no-plusplus */
import { Cell } from './Cell';
import { Colors } from './Colors';

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
}
