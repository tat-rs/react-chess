import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell
}
function CellComponents({ cell }: CellProps) {
  return (
    <div className={`cell ${cell.color}`} />
  );
}

export default CellComponents;
