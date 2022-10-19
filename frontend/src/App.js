import Keyboard from './components/Keyboard';
import MainBoard from './components/MainBoard';
import styled from 'styled-components';
import Header from './components/Header';
import { useContext } from 'react';
import { BoardContext } from './context/BoardContext';
import { GameContext } from './context/GameContext';
import Gameover from './components/Gameover';
import Chronometer from './components/Chronometer';
import BestTimes from './components/BestTimes';

const App = () => {
    const { invalidGuessWarning } = useContext(BoardContext);
    const { gameOver, showBestTimes } = useContext(GameContext);

    return (
        <Wrapper>
            <Header />
            {showBestTimes && <BestTimes />}
            <MainBoard />

            <Keyboard />
            <Chronometer />
            <GameMessage>
                {gameOver ? (
                    <Gameover />
                ) : (
                    <>{!invalidGuessWarning && <>{`:-)`}</>}</>
                )}
                {invalidGuessWarning && <>{`Invalid word :-/`}</>}
            </GameMessage>
        </Wrapper>
    );
};

const GameMessage = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: stretch;
    width: 100%;
    min-height: 3rem;
    font-size: xx-large;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    align-content: stretch;
`;

export default App;
