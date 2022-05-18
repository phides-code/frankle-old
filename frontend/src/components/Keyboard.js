import { useContext, useState } from "react";
import styled from "styled-components";
import { WordContext } from "../WordContext";
const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "<"],
    ["?", "Z", "X", "C", "V", "B", "N", "M", "✔️"],
];

const Keyboard = () => {
    const {
        currentRowNumber,
        setCurrentRowNumber,
        currentLetterPosition,
        setCurrentLetterPosition,
        wordLength,
    } = useContext(WordContext);

    const [canSubmit, setCanSubmit] = useState(false);

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
        if (currentLetterPosition < wordLength) {
            document.getElementById(
                `${currentRowNumber}-${currentLetterPosition}`
            ).innerText = letter;
            setCurrentLetterPosition((pos) => pos + 1);
            if (currentLetterPosition === wordLength - 1) {
                setCanSubmit(true);
            }
        }
    };

    const checkWord = () => {
        if (canSubmit) {
            let guess = "";
            for (let i = 0; i < wordLength; i++) {
                guess += document.getElementById(
                    `${currentRowNumber}-${i}`
                ).innerText;
            }
            console.log("checking word: " + guess);
            setCurrentRowNumber((row) => row + 1);
            setCurrentLetterPosition(0);
        }
    };

    const handleKey = (e) => {
        if (e.target.value === "✔️") {
            checkWord();
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
                                    value={key}
                                    key={i}
                                    onClick={(e) => {
                                        handleKey(e);
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
`;

export default Keyboard;
