import GuessRow from "./GuessRow";

const MainBoard = () => {
    const numOfGuessRows = 6;
    const rows = Array(numOfGuessRows).fill(null);

    return (
        <div>
            {rows.map((_, i) => {
                return <GuessRow key={i} />;
            })}
        </div>
    );
};

export default MainBoard;
