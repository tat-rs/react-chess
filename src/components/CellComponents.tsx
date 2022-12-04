import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}
function CellComponents({ cell, selected, click }: CellProps) {
  function clickOnCell() {
    click(cell);
  }
  return (
    <div
      className={`cell ${cell.color} ${selected ? 'selected' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => clickOnCell()}
      onKeyDown={() => clickOnCell()}
    >
      {
        cell.figure && (
          <img src={`${cell.figure.logo}`} alt={cell.figure.name} />
        )
      }
    </div>
  );
}

export default CellComponents;
