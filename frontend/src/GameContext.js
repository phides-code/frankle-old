import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);
    const [currentRowNumber, setCurrentRowNumber] = useState(0);
    const [guesses, setGuesses] = useState([]);

    const { user } = useContext(UserContext);
    const wordLength = 5;
    const numOfGuessRows = 6;

    const saveGame = async (lastGuess) => {
        const res = await fetch("/api/savegame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.email,
                word: currentWord,
                onRow: currentRowNumber + 1,
                guesses: [...guesses, lastGuess],
                gameOver,
                gameWon,
            }),
        });
        const saveGameResponse = await res.json();
        console.log(
            `got saveGameResponse.message: ${saveGameResponse.message}`
        );
    };

    useEffect(() => {
        const getRandomWord = async () => {
            const res = await fetch("/api/randomword");
            const randomWordResponse = await res.json();
            console.log("got randomWord: ");
            console.log(randomWordResponse.randomWord.word);
            setCurrentWord(randomWordResponse.randomWord.word);
        };
        if (!currentWord) {
            getRandomWord();
        }
    }, [currentWord]);

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
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
