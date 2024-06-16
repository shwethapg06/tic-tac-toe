import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal display

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkDraw = (board) => {
    return board.every((cell) => cell !== "");
  };

  const toggle = (num) => {
    if (board[num] || message) {
      return;
    }
    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? "x" : "o";
    setBoard(newBoard);
    setCount(count + 1);

    const winner = checkWin(newBoard);
    if (winner) {
      setMessage(`Player ${winner === "x" ? "X" : "O"} wins!`);
      setShowModal(true); // Show modal when there's a winner
    } else if (checkDraw(newBoard)) {
      setMessage("It's a draw!");
      setShowModal(true); // Show modal on draw
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setMessage("");
    setShowModal(false); // Hide modal on reset
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="boxes" onClick={() => toggle(index)}>
            {value && (
              <img
                src={value === "x" ? cross_icon : circle_icon}
                alt={value}
                className="icon"
              />
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{message}</h2>
            <button className="modal-reset" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
      {!showModal && (
        <button className="reset" onClick={resetGame}>
          Reset
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
