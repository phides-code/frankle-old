import { useContext, useEffect } from "react";
import { WordContext } from "../WordContext";
import GuessRow from "./GuessRow";

const MainBoard = () => {
    const { numOfGuessRows, setCurrentWord } = useContext(WordContext);

    const rows = Array(numOfGuessRows).fill(null);

    // useEffect(() => {
    //     const getRandomWord = async () => {
    //         const res = await fetch("/api/randomword");
    //         const data = await res.json();
    //         console.log("got randomWord data: ");
    //         console.log(data);
    //         setCurrentWord(data);
    //     };
    //     getRandomWord();
    // }, []);

    return (
        <div>
            {rows.map((_, i) => {
                return <GuessRow rowNum={i} key={i} />;
            })}
        </div>
    );
};

export default MainBoard;
