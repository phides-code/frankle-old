import React, { createContext, useEffect, useState } from 'react';
const CryptoJS = require('crypto-js');

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [toggleReset, setToggleReset] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);
    const [currentRowNumber, setCurrentRowNumber] = useState(0);
    const [currentLetterPosition, setCurrentLetterPosition] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [finalTime, setFinalTime] = useState(null);
    const [showBestTimes, setShowBestTimes] = useState(false);
    const [bestTimes, setBestTimes] = useState(null);
    const [showPromptForInitials, setShowPromptForInitials] = useState(false);
    const wordLength = 5;
    const numOfGuessRows = 5;

    const getBestTimes = async () => {
        const res = await fetch('/api/getbesttimes');
        const data = await res.json();
        return data.bestTimes;
    };

    const decryptWord = (hashedWord) => {
        return CryptoJS.AES.decrypt(hashedWord, 'banana').toString(
            CryptoJS.enc.Utf8
        );
    };

    const checkForBestTime = async (thisTime) => {
        const thisTimeFormatted =
            thisTime.slice(0, 2) +
            thisTime.slice(3, 5) +
            thisTime.slice(6, 8) +
            thisTime.slice(9, 11);

        const bestTimes = await getBestTimes();

        if (bestTimes.length < 10 || thisTimeFormatted < bestTimes[9].time) {
            // add this to best times
            setShowPromptForInitials(true);
        }
    };

    const checkForGameOver = async (lastGuess) => {
        const deHashedWord = decryptWord(currentWord);
        const gameStatus = {
            gameWon,
            gameOver,
            word: currentWord,
            startTime,
            onRow: currentRowNumber + 1,
            guesses: [...guesses, lastGuess],
            timeElapsed,
        };

        if (lastGuess === deHashedWord) {
            if (currentRowNumber === 0) {
                gameStatus.timeElapsed = '00:00:00.00';
            }

            setGameWon(true);
            setFinalTime(gameStatus.timeElapsed);
            setGameOver(true);
            checkForBestTime(gameStatus.timeElapsed);
            gameStatus.gameWon = true;
            gameStatus.gameOver = true;
        } else if (currentRowNumber === numOfGuessRows - 1) {
            setGameOver(true);
            gameStatus.gameOver = true;
        }
    };

    const getRandomWord = async () => {
        const res = await fetch('/api/randomword');
        const randomWordResponse = await res.json();

        setCurrentWord(randomWordResponse.randomWord);
    };

    const resetGame = () => {
        for (let i = 0; i < numOfGuessRows; i++) {
            for (let j = 0; j < wordLength; j++) {
                const letterBox = document.getElementById(`${i}-${j}`);

                letterBox.classList.remove(
                    'rightPosition',
                    'wrongPosition',
                    'badLetter'
                );
                letterBox.innerText = '';
            }
        }

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < alphabet.length; i++) {
            document
                .getElementById(alphabet[i])
                .classList.remove(
                    'rightPosition',
                    'wrongPosition',
                    'badLetter'
                );
        }

        setGameOver(false);
        setGameWon(false);
        getRandomWord();
        setGuesses([]);
        setCurrentRowNumber(0);
        setCurrentLetterPosition(0);
        setStartTime(null);
        setFinalTime(null);
        setTimeElapsed(0);
        setToggleReset(!toggleReset);
    };

    const colorize = (guess, answer, rowNumber) => {
        const deHashedWord = decryptWord(answer);

        for (let i = 0; i < wordLength; i++) {
            const letterBox = document.getElementById(`${rowNumber}-${i}`);
            const keyboardKey = document.getElementById(guess[i]);
            letterBox.innerText = guess[i];

            if (guess[i] === deHashedWord[i]) {
                letterBox.classList.add('rightPosition');
                keyboardKey.classList.remove('wrongPosition');
                keyboardKey.classList.add('rightPosition');
            } else if (deHashedWord.includes(guess[i])) {
                letterBox.classList.add('wrongPosition');
                keyboardKey.classList.add('wrongPosition');
            } else {
                letterBox.classList.add('badLetter');
                keyboardKey.classList.add('badLetter');
            }
        }
    };

    useEffect(() => {
        const startGame = async () => {
            console.log('getting random word...');
            getRandomWord();
        };

        startGame();
    }, [toggleReset]);

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
                currentLetterPosition,
                setCurrentLetterPosition,
                checkForGameOver,
                guesses,
                setGuesses,
                setToggleReset,
                resetGame,
                colorize,
                startTime,
                setStartTime,
                timeElapsed,
                setTimeElapsed,
                finalTime,
                showBestTimes,
                setShowBestTimes,
                bestTimes,
                setBestTimes,
                getBestTimes,
                showPromptForInitials,
                setShowPromptForInitials,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
