import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    return (
        <GameContext.Provider
            value={{
                gameOver,
                setGameOver,
                gameWon,
                setGameWon,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
