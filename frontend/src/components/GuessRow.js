import { useContext } from "react";
import styled from "styled-components";
import { WordContext } from "../WordContext";

const GuessRow = ({ rowNum }) => {
    const { wordLength } = useContext(WordContext);
    const letters = Array(wordLength).fill(null);

    return (
        <Wrapper>
            {letters.map((_, i) => {
                return <Letter id={`${rowNum}-${i}`} key={i} />;
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
    height: 3rem;
    width: 3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
`;

export default GuessRow;
