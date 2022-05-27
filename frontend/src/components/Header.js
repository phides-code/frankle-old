import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../context/GameContext";
import { UserContext } from "../context/UserContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { isAuthenticated, setShowingProfile } = useContext(UserContext);
    const { resetGame, currentRowNumber } = useContext(GameContext);

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
                {isAuthenticated ? (
                    <>
                        <HeaderButton
                            onClick={() => {
                                setShowingProfile(true);
                            }}
                        >
                            Profile
                        </HeaderButton>
                        <LogoutButton>Logout</LogoutButton>
                    </>
                ) : (
                    <LoginButton>Login</LoginButton>
                )}
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
