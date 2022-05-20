import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { isAuthenticated, setShowingProfile } = useContext(UserContext);

    return (
        <Wrapper>
            <Frankle>Frankle</Frankle>
            <div>
                {isAuthenticated ? (
                    <div>
                        <ProfileButton
                            onClick={() => {
                                setShowingProfile(true);
                            }}
                        >
                            Profile
                        </ProfileButton>
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

const ProfileButton = styled.button`
    margin-right: 0.8rem;
`;

export default Header;
