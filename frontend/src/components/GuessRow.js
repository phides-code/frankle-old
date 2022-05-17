import styled from "styled-components";

const GuessRow = () => {
    const wordLength = 5;
    const letters = Array(wordLength).fill(null);

    return (
        <Wrapper>
            {letters.map((_, i) => {
                return <Letter key={i}>?</Letter>;
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Letter = styled.div`
    border: 1px solid black;
    margin: 0.4rem;
    padding: 1.5rem;
`;

export default GuessRow;
