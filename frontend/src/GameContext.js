import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [toggleReset, setToggleReset] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);
    const [currentRowNumber, setCurrentRowNumber] = useState(0); // move to boardcontext?
    const [guesses, setGuesses] = useState([]); // move to boardcontext?
    const { user, isAuthenticated, isLoading } = useContext(UserContext);
    const wordLength = 5;
    const numOfGuessRows = 6;

    const saveGame = async (lastGuess) => {
        if (isAuthenticated) {
            let gameStatus = { gameWon, gameOver };

            if (lastGuess === currentWord) {
                setGameWon(true);
                setGameOver(true);
                gameStatus.gameWon = true;
                gameStatus.gameOver = true;
            } else if (currentRowNumber === numOfGuessRows) {
                setGameOver(true);
                gameStatus.gameOver = true;
            }

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

    const resetGame = () => {
        // needs work
        for (let i = 0; i < currentRowNumber; i++) {
            for (let j = 0; i < wordLength; i++) {
                console.log(`clearing letterBox ${i}-${j}`);
                const letterBox = document.getElementById(`${i}-${j}`);
                letterBox.classList.remove("rightPosition");
                letterBox.classList.remove("wrongPosition");
                letterBox.classList.remove("badLetter");
            }
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

        const gameFlow = async () => {
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

        gameFlow();
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
