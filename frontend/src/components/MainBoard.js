import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import GuessRow from "./GuessRow";

const MainBoard = () => {
    const { numOfGuessRows } = useContext(GameContext);

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
