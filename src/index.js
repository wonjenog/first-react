import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = ({value, onClick}) =>{
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

const reStart = () => {
  window.location.reload();
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(''))
  const [next, setNext] = useState('X')

  const hasWinner = () => {
    const lines = [
	    [0, 1, 2],
	    [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let i = 0; i< lines.length; ++i) {
      const [f, s, t] = lines[i];
      if(squares[f] !== '' && squares[f] === squares[s] && squares[f] == squares[t]) return squares[f]
    }
    return false;
  }

  const isDone = () => {
    for (let i =0; i < 8; i++){
      if(squares[i] === '') return;
    }
    return status = 'This game is a draw. Try one more game!';
  }

  const handleClick = (i) => {
    if(squares[i] !== '' || hasWinner()) return;
    const sq = squares.slice()
    sq[i] = next;
    if(next === 'X') setNext('O')
    else setNext('X')

    setSquares(sq)
  }

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={()=> handleClick(i)}/>;
  }

  let status = 'Next player: ' + next;
  if(hasWinner()) {
    status = 'Winner: ' + hasWinner();
  } else isDone();

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game = () =>  {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
      <div>
        <button onClick = {reStart}>restart</button>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);