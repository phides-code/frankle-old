import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../GameContext";
import { UserContext } from "../UserContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { isAuthenticated, setShowingProfile } = useContext(UserContext);
    const { resetGame } = useContext(GameContext);

    return (
        <Wrapper>
            <Frankle>Frankle</Frankle>
            <div>
                {isAuthenticated ? (
                    <div>
                        <HeaderButton
                            onClick={() => {
                                resetGame();
                            }}
                        >
                            Reset
                        </HeaderButton>
                        <HeaderButton
                            onClick={() => {
                                setShowingProfile(true);
                            }}
                        >
                            Profile
                        </HeaderButton>
                        <LogoutButton>Logout</LogoutButton>
                    </div>
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

// const ProfileButton = styled.button`
//     margin-right: 0.8rem;
// `;

export default Header;
