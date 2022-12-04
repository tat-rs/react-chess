import { useState, useEffect } from 'react';
import './App.css';
import BoardComponents from './components/BoardComponents';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState(new Board());
  const firstPlayer = new Player(Colors.WHITE);
  const secondPlayer = new Player(Colors.BLACK);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  // новая партия игры
  function restart() {
    const newboard = new Board();
    newboard.initCells();
    setBoard(newboard);
    newboard.addFigure();
  }

  function swapPayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? secondPlayer : firstPlayer);
  }

  useEffect(() => {
    restart();
    setCurrentPlayer(firstPlayer);
  }, []);

  return (
    <div className="app">
      <p>{`Текущий ход: ${currentPlayer?.color === Colors.WHITE ? 'первый' : 'второй'} игрок`}</p>
      <BoardComponents
        board={board}
        setBoard={setBoard}
        swapPlayer={() => swapPayer()}
        currentPlayer={currentPlayer}
      />
    </div>
  );
}

export default App;
