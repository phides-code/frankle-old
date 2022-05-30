import { useContext } from "react";
import styled from "styled-components";
import { BoardContext } from "../context/BoardContext";
import { GameContext } from "../context/GameContext";

const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "<"],
    ["?", "Z", "X", "C", "V", "B", "N", "M", "✔️"],
];

const Keyboard = () => {
    const {
        currentRowNumber,
        wordLength,
        numOfGuessRows,
        gameOver,
        currentLetterPosition,
        setCurrentLetterPosition,
    } = useContext(GameContext);
    const { processGuess, setCanSubmit } = useContext(BoardContext);

    const doBackspace = () => {
        if (currentLetterPosition > 0) {
            setCanSubmit(false);
            document.getElementById(
                `${currentRowNumber}-${currentLetterPosition - 1}`
            ).innerText = "";
            setCurrentLetterPosition((pos) => pos - 1);
        }
    };

    const typeLetter = (letter) => {
        if (
            currentLetterPosition < wordLength &&
            currentRowNumber < numOfGuessRows
        ) {
            document.getElementById(
                `${currentRowNumber}-${currentLetterPosition}`
            ).innerText = letter;
            setCurrentLetterPosition((pos) => pos + 1);
            if (currentLetterPosition === wordLength - 1) {
                setCanSubmit(true);
            }
        }
    };

    const handleKey = (e) => {
        if (e.target.value === "✔️") {
            processGuess();
        } else if (e.target.value === "<") {
            doBackspace();
        } else {
            typeLetter(e.target.value);
        }
    };

    return (
        <Wrapper>
            {keyboardLayout.map((row, i) => {
                return (
                    <Row key={i}>
                        {row.map((key, i) => {
                            return (
                                <Key
                                    id={key}
                                    value={key}
                                    key={i}
                                    onClick={(e) => {
                                        if (!gameOver) {
                                            handleKey(e);
                                        }
                                    }}
                                >
                                    {key}
                                </Key>
                            );
                        })}
                    </Row>
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Row = styled.div`
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
`;

const Key = styled.button`
    margin-right: 0.2rem;
    font-size: large;
    width: 2rem;
    height: 3rem;

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

export default Keyboard;
