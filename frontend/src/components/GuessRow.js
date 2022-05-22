import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../GameContext";

const GuessRow = ({ rowNum }) => {
    const { wordLength } = useContext(GameContext);
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
    font-size: x-large;
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
    &.rightPosition {
        background-color: green;
        color: white;
    }
    &.wrongPosition {
        background-color: yellow;
        color: black;
    }
    &.badLetter {
        background-color: grey;
        color: white;
    }
`;

export default GuessRow;
