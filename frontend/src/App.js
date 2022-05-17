import Keyboard from "./components/Keyboard";
import MainBoard from "./components/MainBoard";
import styled from "styled-components";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { useContext } from "react";
import { UserContext } from "./UserContext";
/*
front-end:
login with auth0
on-screen list of keys - disabled style, green style, yellow style

back-end:
back-end: user stats in db
list of words
*/
const App = () => {
    const { showingProfile } = useContext(UserContext);

    return (
        <Wrapper>
            <Header />
            {showingProfile && <Profile />}
            <MainBoard />
            <Keyboard />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    align-content: stretch;
`;

export default App;
