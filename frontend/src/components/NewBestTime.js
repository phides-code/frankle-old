import styled from 'styled-components';

const NewBestTime = () => {
    const initials = Array(3).fill(null);
    return (
        <div>
            <div>New best time!</div>
            <div>Enter your initials:</div>
            <Initials>
                {initials.map((_, i) => {
                    return <Letter id={`initial-${i}`} key={i} />;
                })}
            </Initials>
        </div>
    );
};

const Initials = styled.div`
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
`;

export default NewBestTime;
