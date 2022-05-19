import styled from "styled-components";

const InvalidWordError = () => {
    return <Wrapper>Invalid Word.</Wrapper>;
};

const Wrapper = styled.div`
    position: absolute;
    top: 47%;
    font-size: xx-large;
    color: red;
`;

export default InvalidWordError;
