import styled from "styled-components";

const Header = () => {
    return (
        <Wrapper>
            <div>Frankle</div>
            <button>Login</button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    align-content: stretch;
`;

export default Header;
