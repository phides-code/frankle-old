import React, { createContext, useState } from "react";

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
    const [currentWord, setCurrentWord] = useState("LEARN");
    const [currentRowNumber, setCurrentRowNumber] = useState(0);
    const [currentLetterPosition, setCurrentLetterPosition] = useState(0);

    const wordLength = 5;
    const numOfGuessRows = 6;

    return (
        <WordContext.Provider
            value={{
                currentWord,
                setCurrentWord,
                currentRowNumber,
                setCurrentRowNumber,
                currentLetterPosition,
                setCurrentLetterPosition,
                wordLength,
                numOfGuessRows,
            }}
        >
            {children}
        </WordContext.Provider>
    );
};
