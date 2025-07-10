import React from "react";
import "./TicTacToeBoard.css";

// PUBLIC_INTERFACE
/**
 * Renders the 3x3 Tic Tac Toe board.
 *
 * @param {Object} props
 * @param {Array} props.squares - Array of 9 elements ('X', 'O', or null), current board state
 * @param {Function} props.onCellClick - Function to call (index) when a cell is clicked
 * @param {Boolean} props.disabled - Whether all cells are disabled (game over or waiting)
 */
function TicTacToeBoard({ squares, onCellClick, disabled }) {
  return (
    <div className="ttt-board" role="grid">
      {squares.map((value, idx) => (
        <button
          key={idx}
          className="ttt-cell"
          data-testid={`cell-${idx}`}
          disabled={!!value || disabled}
          aria-label={`Cell ${idx + 1}, ${value ? "filled" : "empty"}`}
          onClick={() => onCellClick(idx)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default TicTacToeBoard;
