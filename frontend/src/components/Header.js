import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { isAuthenticated, setShowingProfile } = useContext(UserContext);

    return (
        <Wrapper>
            <div>Frankle</div>
            <div>
                {isAuthenticated ? (
                    <div>
                        <button
                            onClick={() => {
                                setShowingProfile(true);
                            }}
                        >
                            Profile
                        </button>
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
`;

export default Header;
