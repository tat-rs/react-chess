import { useState, useEffect } from 'react';
import './App.css';
import BoardComponents from './components/BoardComponents';
import { Board } from './models/Board';

function App() {
  const [board, setBoard] = useState(new Board());

  // новая партия игры
  function restart() {
    const newboard = new Board();
    newboard.initCells();
    setBoard(newboard);
  }

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="app">
      <BoardComponents board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;
