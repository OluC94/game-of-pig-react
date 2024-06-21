import { useState } from "react";

export default function Game() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [playerTurn, setPlayerTurn] = useState("Player 1");
  const [lastRoll, setLastRoll] = useState(null);
  const [turnTotal, setTurnTotal] = useState(0);
  const [target, setTarget] = useState(100);

  function handleRoll() {
    const roll = Math.floor(Math.random() * 6) + 1;
    setLastRoll(roll);

    roll === 1 ? changeTurn() : setTurnTotal((currTotal) => currTotal + roll);
  }

  function handleStick() {
    const newP1Score = player1Score + turnTotal;
    const newP2Score = player2Score + turnTotal;

    if (playerTurn === "Player 1") {
      setPlayer1Score(newP1Score);
      if (newP1Score < target) {
        changeTurn();
      }
    }
    if (playerTurn === "Player 2") {
      setPlayer2Score(newP2Score);
      if (newP2Score < target) {
        changeTurn();
      }
    }
  }

  function changeTurn() {
    if (playerTurn === "Player 1" && !isGameWon()) {
      setPlayerTurn("Player 2");
      setTurnTotal(0);
    }
    if (playerTurn === "Player 2" && !isGameWon()) {
      setPlayerTurn("Player 1");
      setTurnTotal(0);
    }
  }
  /**
   *
   * @param {"long" | "short"} gameType
   */
  function handleNewGame(gameType) {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setLastRoll(null);
    setTurnTotal(0);
    setPlayerTurn("Player 1");
    gameType === "long" ? setTarget(100) : setTarget(30);
  }

  const newLongGame = () => handleNewGame("long");
  const newShortGame = () => handleNewGame("short");

  function isGameWon() {
    return player1Score >= target || player2Score >= target;
  }

  return (
    <div>
      <h1>Game Of Pig</h1>
      <h3>First to {target}</h3>

      <div>
        <p>P1 score: {player1Score}</p>
        <p>P2 score: {player2Score}</p>
      </div>

      <div>
        <button onClick={handleRoll} disabled={isGameWon()}>
          Roll
        </button>
        {isGameWon() ? <p>{playerTurn} wins</p> : <p>{playerTurn}&apos;s turn </p>}
        <p>Last Roll: {lastRoll}</p>
        <p>Turn total: {turnTotal}</p>

        <button onClick={handleStick} disabled={isGameWon()}>
          Stick
        </button>
      </div>

      <div>
        <button onClick={newLongGame}>New Game</button>

        <button onClick={newShortGame}>New Short Game</button>
      </div>
    </div>
  );
}
