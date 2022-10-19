import { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';

const Chronometer = () => {
    const {
        startTime,
        timeElapsed,
        setTimeElapsed,
        gameOver,
        finalTime,
        currentRowNumber,
    } = useContext(GameContext);

    const gameStarted = !!startTime;

    const gameTimer = setTimeout(() => {
        setTimeElapsed(
            new Date(new Date() - startTime).toISOString().substring(11, 22)
        );
    }, 10);

    if (gameOver) {
        clearTimeout(gameTimer);
    }

    return (
        <>
            {gameStarted && (
                <>
                    {currentRowNumber === 1 && gameOver ? (
                        <Wrapper>00:00:00.00 (wow!)</Wrapper>
                    ) : (
                        <Wrapper>{finalTime ? finalTime : timeElapsed}</Wrapper>
                    )}
                </>
            )}
        </>
    );
};

const Wrapper = styled.div`
    font-size: xx-large;
`;

export default Chronometer;
