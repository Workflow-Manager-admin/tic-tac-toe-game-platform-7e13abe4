import React from "react";

// PUBLIC_INTERFACE
/**
 * Displays a list of past games.
 *
 * @param {Object} props
 * @param {Array} props.history - [{id, winner, movesCount, timestamp}]
 */
function GameHistory({ history = [] }) {
  if (!history.length)
    return (
      <div className="game-history" style={{ margin: "1.5rem 0", opacity: 0.7 }}>
        No game history yet.
      </div>
    );
  return (
    <div className="game-history" style={{ margin: "1.5rem 0" }}>
      <h4 style={{ marginBottom: "0.5rem", textAlign: "left" }}>Game History</h4>
      <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
        {history.map((g) => (
          <li
            key={g.id}
            style={{
              marginBottom: "0.3rem",
              background: "#f4f4f4",
              borderRadius: "8px",
              padding: "0.45rem 1rem",
              fontSize: "0.98rem",
              color: "#333",
              borderLeft: g.winner
                ? `4px solid ${g.winner === 'Draw' ? '#999' : (g.winner === 'X' ? '#1976d2' : '#ff5252')}`
                : `4px solid #ccc`
            }}
            data-testid="history-item"
          >
            <b>Winner:</b> {g.winner || "None"}{" "}
            <span style={{ marginLeft: 8 }}>
              ({g.movesCount} moves, {new Date(g.timestamp).toLocaleString()})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
