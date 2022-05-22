import Keyboard from "./components/Keyboard";
import MainBoard from "./components/MainBoard";
import styled from "styled-components";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { BoardContext } from "./BoardContext";
import { GameContext } from "./GameContext";
import Gameover from "./components/Gameover";

const App = () => {
    const { showingProfile } = useContext(UserContext);
    const { invalidGuessWarning } = useContext(BoardContext);
    const { gameOver } = useContext(GameContext);

    return (
        <Wrapper>
            <Header />
            {showingProfile && <Profile />}
            <MainBoard />
            <GameMessage>
                {gameOver ? (
                    <Gameover />
                ) : (
                    <>{!invalidGuessWarning && <>{`:-)`}</>}</>
                )}
                {invalidGuessWarning && <>{`Invalid word :-/`}</>}
            </GameMessage>
            <Keyboard />
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
