import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[]
}

function LostFigures({ title, figures }: LostFiguresProps) {
  return (
    <div className="lost__container">
      <h2 className="lost__title">{title}</h2>
      <ul className="lost__list">
        {
            figures.length > 0 && figures.map((figure) => (
              <li key={figure.id} className="lost__item">
                <p className="lost__subtitle">{figure.name}</p>
                <img className="lost__image" src={`${figure.logo}`} alt={figure.name} />
              </li>
            ))
          }
      </ul>
    </div>
  );
}

export default LostFigures;
