import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [toggleReset, setToggleReset] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);
    const [currentRowNumber, setCurrentRowNumber] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const { user, isAuthenticated, isLoading } = useContext(UserContext);
    const wordLength = 5;
    const numOfGuessRows = 6;

    const saveGame = async (lastGuess) => {
        let gameStatus = { gameWon, gameOver };

        if (lastGuess === currentWord) {
            setGameWon(true);
            setGameOver(true);
            gameStatus.gameWon = true;
            gameStatus.gameOver = true;
        } else if (currentRowNumber === numOfGuessRows - 1) {
            setGameOver(true);
            gameStatus.gameOver = true;
        }
        if (isAuthenticated) {
            const res = await fetch("/api/savegame", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.email,
                    word: currentWord,
                    onRow: currentRowNumber + 1,
                    guesses: [...guesses, lastGuess],
                    ...gameStatus,
                }),
            });
            const saveGameResponse = await res.json();
            console.log(
                `got saveGameResponse.message: ${saveGameResponse.message}`
            );
        }
    };

    const getRandomWord = async () => {
        const res = await fetch("/api/randomword");
        const randomWordResponse = await res.json();
        console.log("got randomWord: ");
        console.log(randomWordResponse.randomWord.word);
        setCurrentWord(randomWordResponse.randomWord.word);
    };

    const deleteGame = async () => {
        const res = await fetch("/api/deletegame", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.email,
                word: currentWord,
            }),
        });

        const deleteGameResponse = await res.json();
        console.log(
            `got deleteGameResponse.message: ${deleteGameResponse.message}`
        );
    };

    const resetGame = () => {
        console.log("resetting game...");
        for (let i = 0; i < currentRowNumber; i++) {
            for (let j = 0; j < wordLength; j++) {
                const letterBox = document.getElementById(`${i}-${j}`);
                letterBox.classList.remove(
                    "rightPosition",
                    "wrongPosition",
                    "badLetter"
                );
                letterBox.innerText = "";
            }
        }

        if (!gameOver && isAuthenticated) {
            deleteGame();
        }

        setGameOver(false);
        setGameWon(false);
        getRandomWord();
        setGuesses([]);
        setCurrentRowNumber(0);
        setToggleReset(!toggleReset);
    };

    useEffect(() => {
        const checkForGameInProgress = async () => {
            const res = await fetch("/api/loadgame", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.email }),
            });
            const loadResult = await res.json();
            return loadResult.gameInProgress;
        };

        const loadGame = (gameInProgress) => {
            setCurrentWord(gameInProgress.word);
            setGuesses(gameInProgress.guesses);

            // loop through array of guesses
            for (let i = 0; i < gameInProgress.guesses.length; i++) {
                // loop through letters in word
                for (let j = 0; j < wordLength; j++) {
                    const thisLetter = gameInProgress.guesses[i][j];
                    const letterBox = document.getElementById(`${i}-${j}`);
                    letterBox.innerText = thisLetter;

                    if (thisLetter === gameInProgress.word[j]) {
                        letterBox.classList.add("rightPosition");
                    } else if (gameInProgress.word.includes(thisLetter)) {
                        letterBox.classList.add("wrongPosition");
                    } else {
                        letterBox.classList.add("badLetter");
                    }
                }
            }

            setCurrentRowNumber(gameInProgress.onRow);
        };

        const startGame = async () => {
            if (isAuthenticated) {
                const gameInProgress = await checkForGameInProgress();
                if (gameInProgress === "none") {
                    console.log("no resumable game, getting random word...");
                    getRandomWord();
                } else {
                    console.log("resuming game: ");
                    console.log(gameInProgress);
                    loadGame(gameInProgress);
                }
            } else if (!isLoading) {
                console.log("no authenticated user, getting random word...");
                getRandomWord();
            }
        };

        startGame();
    }, [isLoading, isAuthenticated, user?.email, toggleReset]);

    return (
        <GameContext.Provider
            value={{
                currentWord,
                setCurrentWord,
                gameOver,
                setGameOver,
                gameWon,
                setGameWon,
                wordLength,
                numOfGuessRows,
                currentRowNumber,
                setCurrentRowNumber,
                saveGame,
                guesses,
                setGuesses,
                setToggleReset,
                resetGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
