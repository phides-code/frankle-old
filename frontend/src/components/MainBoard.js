import { useContext } from "react";
import { WordContext } from "../WordContext";
import GuessRow from "./GuessRow";

const MainBoard = () => {
    const { numOfGuessRows } = useContext(WordContext);

    const rows = Array(numOfGuessRows).fill(null);

    return (
        <div>
            {rows.map((_, i) => {
                return <GuessRow rowNum={i} key={i} />;
            })}
        </div>
    );
};

export default MainBoard;
