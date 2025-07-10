const BACKEND_BASE =
  process.env.REACT_APP_TTT_BACKEND_URL || "http://localhost:3001";

/**
 * PUBLIC_INTERFACE
 * Starts a new Tic Tac Toe game.
 * @param {"X"|"O"} player - Player to start as
 * @returns {Promise<{gameId: string, initialState: object}>}
 */
export async function startGame(player) {
  const res = await fetch(`${BACKEND_BASE}/api/game/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player })
  });
  if (!res.ok) throw new Error("Could not start game");
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * Makes a move in the current game.
 * @param {string} gameId
 * @param {number} cellIndex
 * @returns {Promise<{newState: object}>}
 */
export async function makeMove(gameId, cellIndex) {
  const res = await fetch(`${BACKEND_BASE}/api/game/${gameId}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cell: cellIndex })
  });
  if (!res.ok) throw new Error("Could not make move");
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * Gets the current state for an existing game.
 * @param {string} gameId
 * @returns {Promise<object>}
 */
export async function getGameState(gameId) {
  const res = await fetch(`${BACKEND_BASE}/api/game/${gameId}/state`);
  if (!res.ok) throw new Error("Could not fetch game state");
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * Fetches previous game history.
 * @returns {Promise<Array>} - Array of games
 */
export async function fetchGameHistory() {
  const res = await fetch(`${BACKEND_BASE}/api/game/history`);
  if (!res.ok) throw new Error("Could not fetch history");
  return res.json();
}
