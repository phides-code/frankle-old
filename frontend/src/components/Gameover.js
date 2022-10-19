import styled from 'styled-components';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import NewBestTime from './NewBestTime';
const CryptoJS = require('crypto-js');

const Gameover = () => {
    const { gameWon, resetGame, currentWord, showPromptForInitials } =
        useContext(GameContext);

    return (
        <Wrapper>
            {gameWon ? (
                <GameWonMessages>
                    <WinMessage>{`Congratulations :-)`}</WinMessage>
                    {showPromptForInitials && <NewBestTime />}
                </GameWonMessages>
            ) : (
                <LossMessage>{`It was ${CryptoJS.AES.decrypt(
                    currentWord,
                    'banana'
                ).toString(CryptoJS.enc.Utf8)} :-(`}</LossMessage>
            )}
            <PlayAgainButton
                onClick={() => {
                    resetGame();
                }}
            >
                Play Again
            </PlayAgainButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: stretch;
`;

const WinMessage = styled.div`
    color: green;
`;

const LossMessage = styled.div`
    color: red;
`;

const PlayAgainButton = styled.button`
    padding: 0.2rem 0.4rem;
`;

const GameWonMessages = styled.div`
    /* display: flex;
    flex-direction: column; */
`;

export default Gameover;
