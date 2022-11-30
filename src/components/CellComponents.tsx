import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell
}
function CellComponents({ cell }: CellProps) {
  return (
    <div className={`cell ${cell.color}`}>
      {
        cell.figure && (
          <img src={`${cell.figure.logo}`} alt={cell.figure.name} />
        )
      }
    </div>
  );
}

export default CellComponents;
