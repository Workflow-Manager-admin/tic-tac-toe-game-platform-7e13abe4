import React from "react";

// PUBLIC_INTERFACE
/**
 * Allows the user to choose their starting player ('X' or 'O').
 *
 * @param {Object} props
 * @param {"X"|"O"|null} props.selected - Currently selected player
 * @param {Function} props.onSelect - Function called with new player ('X' or 'O')
 * @param {Boolean} props.disabled - If true, not selectable
 */
function PlayerSelector({ selected, onSelect, disabled }) {
  return (
    <div className="player-selector" style={{ margin: "1rem 0" }}>
      <span style={{ marginRight: "0.5rem" }}>You play as: </span>
      <button
        type="button"
        className={`btn ${selected === "X" ? "selected" : ""}`}
        onClick={() => onSelect("X")}
        disabled={disabled}
        aria-label="Select X"
        style={{
          marginRight: "0.5rem",
          background: selected === "X" ? "var(--text-secondary)" : "",
          color: selected === "X" ? "#fff" : ""
        }}
      >
        X
      </button>
      <button
        type="button"
        className={`btn ${selected === "O" ? "selected" : ""}`}
        onClick={() => onSelect("O")}
        disabled={disabled}
        aria-label="Select O"
        style={{
          background: selected === "O" ? "var(--text-secondary)" : "",
          color: selected === "O" ? "#fff" : ""
        }}
      >
        O
      </button>
    </div>
  );
}

export default PlayerSelector;
