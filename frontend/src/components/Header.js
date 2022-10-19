import { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';

const Header = () => {
    const { resetGame, currentRowNumber, setShowBestTimes } =
        useContext(GameContext);

    return (
        <Wrapper>
            <Frankle>Frankle</Frankle>
            <div>
                {currentRowNumber > 0 && (
                    <HeaderButton
                        onClick={() => {
                            resetGame();
                        }}
                    >
                        Reset
                    </HeaderButton>
                )}
                <HeaderButton
                    onClick={() => {
                        setShowBestTimes(true);
                    }}
                >
                    Best Times
                </HeaderButton>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;
    font-size: x-large;
    margin-bottom: 0.2rem;
`;

const Frankle = styled.div``;

const HeaderButton = styled.button`
    margin-right: 0.8rem;
`;

export default Header;
