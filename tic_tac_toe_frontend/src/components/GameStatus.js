import React from "react";

// PUBLIC_INTERFACE
/**
 * Displays the current game status (whose turn, win, draw, etc.).
 *
 * @param {Object} props
 * @param {string} props.status - Status message to display
 */
function GameStatus({ status }) {
  return (
    <div
      style={{
        margin: "1rem 0",
        fontWeight: 600,
        color: "var(--text-secondary, #1976d2)",
        fontSize: "1.2rem"
      }}
      data-testid="game-status"
    >
      {status}
    </div>
  );
}

export default GameStatus;
