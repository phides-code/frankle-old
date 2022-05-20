import React, { createContext, useEffect, useState } from "react";

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
    const [currentWord, setCurrentWord] = useState(null);
    const [currentRowNumber, setCurrentRowNumber] = useState(0);
    const [currentLetterPosition, setCurrentLetterPosition] = useState(0);
    const [invalidGuessWarning, setInvalidGuessWarning] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    const wordLength = 5;
    const numOfGuessRows = 6;

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

    const colorize = (guess) => {
        let goodLetters = 0;
        for (let i = 0; i < wordLength; i++) {
            const letterBox = document.getElementById(
                `${currentRowNumber}-${i}`
            );

            if (guess[i] === currentWord[i]) {
                letterBox.classList.add("rightPosition");
                goodLetters++;
            } else if (currentWord.includes(guess[i])) {
                letterBox.classList.add("wrongPosition");
            } else {
                letterBox.classList.add("badLetter");
            }
        }
        if (goodLetters === wordLength) {
            console.log("win!");
        }
    };

    const checkValidity = async (guess) => {
        const res = await fetch("/api/checkvalidity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ guess: guess }),
        });
        const validityResponse = await res.json();

        if (validityResponse.message === "VALID") {
            colorize(guess);
            setCurrentRowNumber((row) => row + 1);
            setCurrentLetterPosition(0);
        } else if (validityResponse.message === "INVALID") {
            setInvalidGuessWarning(true);
            setTimeout(() => {
                setInvalidGuessWarning(false);
            }, 3000);
        }
    };

    const processGuess = () => {
        if (canSubmit) {
            let guess = "";
            for (let i = 0; i < wordLength; i++) {
                guess += document.getElementById(
                    `${currentRowNumber}-${i}`
                ).innerText;
            }
            checkValidity(guess);
        }
    };

    return (
        <WordContext.Provider
            value={{
                currentWord,
                setCurrentWord,
                currentRowNumber,
                setCurrentRowNumber,
                currentLetterPosition,
                setCurrentLetterPosition,
                invalidGuessWarning,
                setInvalidGuessWarning,
                wordLength,
                numOfGuessRows,
                processGuess,
                canSubmit,
                setCanSubmit,
            }}
        >
            {children}
        </WordContext.Provider>
    );
};
