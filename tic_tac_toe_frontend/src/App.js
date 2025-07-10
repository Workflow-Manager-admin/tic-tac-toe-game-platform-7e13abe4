import React, { useState, useEffect } from "react";
import "./App.css";
import TicTacToeBoard from "./components/TicTacToeBoard";
import PlayerSelector from "./components/PlayerSelector";
import GameStatus from "./components/GameStatus";
import GameHistory from "./components/GameHistory";
import {
  startGame,
  makeMove,
  getGameState,
  fetchGameHistory
} from "./api";

// PUBLIC_INTERFACE
/**
 * Main App: handles game UX, state, board, status, player selection, and history.
 */
function App() {
  const [theme, setTheme] = useState("light");
  const [player, setPlayer] = useState(null); // "X" or "O"
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("Choose X or O to begin.");
  const [isGameOver, setGameOver] = useState(false);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Fetch history at load & after game over
  useEffect(() => {
    fetchGameHistory()
      .then(setHistory)
      .catch(() => {});
  }, [gameId, isGameOver]);

  // Handle starting a new game
  const handlePlayerSelect = async (p) => {
    setPlayer(p);
    setLoading(true);
    setStatus("Starting game...");
    setGameOver(false);
    try {
      const { gameId, initialState } = await startGame(p);
      setGameId(gameId);
      setBoard(initialState.board || Array(9).fill(null));
      setCurrentTurn(initialState.currentTurn || "X");
      setStatus(`Game started! Your piece: ${p}, ${initialState.currentTurn}'s turn.`);
    } catch (err) {
      setStatus("Error starting game.");
      setGameId(null);
      setBoard(Array(9).fill(null));
    }
    setLoading(false);
  };

  // Handle making a move
  const handleCellClick = async (idx) => {
    // Prevent moves if not player's turn or already filled or game over
    if (
      isGameOver ||
      loading ||
      !player ||
      player !== currentTurn ||
      board[idx]
    )
      return;

    setLoading(true);

    try {
      const { newState } = await makeMove(gameId, idx);

      setBoard(newState.board);
      setCurrentTurn(newState.currentTurn);

      if (newState.winner) {
        const msg =
          newState.winner === "Draw"
            ? "It's a draw!"
            : `Player ${newState.winner} wins!`;
        setStatus(msg);
        setGameOver(true);
        setGameId(null);
      } else {
        setStatus(`${newState.currentTurn}'s turn.`);
      }
    } catch (err) {
      setStatus("Error making move.");
    }
    setLoading(false);
  };

  // Helper for board display (disabled state computation)
  const disableCells =
    loading || !player || isGameOver || player !== currentTurn;

  // Start new game button
  const handleRestart = () => {
    setPlayer(null);
    setGameId(null);
    setBoard(Array(9).fill(null));
    setStatus("Choose X or O to begin.");
    setGameOver(false);
    setCurrentTurn("X");
  };

  // Determine status message
  let mainStatus =
    status ||
    (isGameOver
      ? "Game over."
      : player
      ? `${currentTurn === player ? "Your" : "Opponent's"} turn (${currentTurn})`
      : "Choose X or O to begin.");

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: "100vh" }}>
        <button
          className="theme-toggle"
          onClick={() => setTheme((prv) => (prv === "light" ? "dark" : "light"))}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <h1 style={{ marginBottom: 0 }}>Tic Tac Toe</h1>
        <div
          style={{
            marginBottom: "0.5rem",
            fontWeight: 300,
            color: "var(--text-secondary, #1976d2)",
            fontSize: "1.2rem"
          }}
        >
          Play Tic Tac Toe, see move history, and challenge yourself!
        </div>
        <PlayerSelector
          selected={player}
          disabled={!!gameId || loading}
          onSelect={handlePlayerSelect}
        />
        <GameStatus status={mainStatus} />
        <TicTacToeBoard
          squares={board}
          onCellClick={handleCellClick}
          disabled={disableCells}
        />
        {gameId || isGameOver ? (
          <button
            className="btn"
            style={{
              margin: "1.5rem 0 0",
              padding: "0.8rem 2.2rem",
              fontWeight: 600,
              fontSize: "1.1rem"
            }}
            onClick={handleRestart}
            aria-label="Start new game"
            data-testid="restart-btn"
            disabled={loading}
          >
            {isGameOver ? "Play Again" : "Restart Game"}
          </button>
        ) : null}
        <div
          style={{
            margin: "2rem auto 0",
            maxWidth: 380,
            background: "rgba(250, 250, 250, 0.85)",
            borderRadius: 14,
            border: "1px solid var(--border-color, #e9ecef)",
            padding: "1rem",
            boxShadow: "0 1px 8px rgba(30,30,40,0.07)"
          }}
        >
          <GameHistory history={history} />
        </div>
      </header>
    </div>
  );
}

export default App;
