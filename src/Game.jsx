import { useState } from "react"

export default function Game() {
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [playerTurn, setPlayerTurn] = useState("Player 1");
    const [isGameInProgress, setIsGameInProgress] = useState(true);
    const [lastRoll, setLastRoll] = useState(0);
    const [turnTotal, setTurnTotal] = useState(0);
    const [target, setTarget] = useState(2);

    function handleRoll(){
        const roll = Math.floor(Math.random() * 6) + 1;
        setLastRoll(roll);

        roll === 1 ? changeTurn() : setTurnTotal(currTotal => currTotal + roll);

    }

    function handleStick(){
        if (playerTurn === "Player 1") {
            setPlayer1Score(currScore => currScore += turnTotal)
        }
        if (playerTurn === "Player 2") {
            setPlayer2Score(currScore => currScore += turnTotal)
        }
        changeTurn();

    }

    function changeTurn(){
        handleEndGame();
        if (playerTurn === "Player 1") {
            setPlayerTurn("Player 2")
            setTurnTotal(0)
        }
        if (playerTurn === "Player 2") {
            setPlayerTurn("Player 1")
            setTurnTotal(0)
        }
    }

    function handleNewGame(gameType) {
        setPlayer1Score(0)
        setPlayer2Score(0)
        setLastRoll(0)
        setTurnTotal(0)
        setIsGameInProgress(true);
        setPlayerTurn("Player 1")
        gameType === "long" ? setTarget(100) : setTarget(30)
    }

    function handleEndGame() {
        if (player1Score >= target || player2Score >= target) {
            console.log("game won")
            setIsGameInProgress(false);
        }
    }

    const newLongGame = () => handleNewGame("long")
    const newShortGame = () => handleNewGame("short")

    return (<div>
        <h1>
            Game Of Pig
        </h1>
        <h3>First to {target}</h3>

        <div>
            <p>P1 score: {player1Score}</p>
            <p>P2 score: {player2Score}</p>
        </div>

        <div>
            <button onClick={isGameInProgress && handleRoll}>
                Roll
            </button>
            {isGameInProgress ?  <p>{playerTurn}'s turn</p> : <p>{playerTurn} wins</p>}
            <p>Last Roll: {lastRoll}</p>
            <p>Turn total: {turnTotal}</p>

            <button onClick={isGameInProgress && handleStick}>
                Stick
            </button>
        </div>

        <div>
            <button onClick={newLongGame}>
            New Game
            </button>

            <button onClick={newShortGame}>
            New Short Game
            </button>
        </div>


    </div>)
}