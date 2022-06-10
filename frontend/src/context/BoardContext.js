import React, { createContext, useContext, useState } from 'react';
import { GameContext } from './GameContext';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
    const [invalidGuessWarning, setInvalidGuessWarning] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    const {
        currentWord,
        wordLength,
        currentRowNumber,
        setCurrentRowNumber,
        setCurrentLetterPosition,
        saveGame,
        setGuesses,
        colorize,
    } = useContext(GameContext);

    const checkValidity = async (guess) => {
        const res = await fetch('/api/checkvalidity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guess: guess }),
        });
        const validityResponse = await res.json();

        if (validityResponse.message === 'VALID') {
            return true;
        } else if (validityResponse.message === 'INVALID') {
            return false;
        }
    };

    const processGuess = async () => {
        if (canSubmit) {
            let guess = '';
            for (let i = 0; i < wordLength; i++) {
                guess += document.getElementById(
                    `${currentRowNumber}-${i}`
                ).innerText;
            }
            if ((await checkValidity(guess)) === true) {
                colorize(guess, currentWord, currentRowNumber);
                setGuesses((currentGuesses) => [...currentGuesses, guess]);
                saveGame(guess);
                setCurrentRowNumber((row) => row + 1);
                setCurrentLetterPosition(0);
                setCanSubmit(false);
            } else {
                setInvalidGuessWarning(true);
                setTimeout(() => {
                    setInvalidGuessWarning(false);
                }, 3000);
            }
        }
    };

    return (
        <BoardContext.Provider
            value={{
                invalidGuessWarning,
                setInvalidGuessWarning,
                processGuess,
                canSubmit,
                setCanSubmit,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};
