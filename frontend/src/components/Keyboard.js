import styled from "styled-components";
const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "<"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "✔️"],
    ["Z", "X", "C", "V", "B", "N", "M"],
];

const Keyboard = () => {
    // return <Wrapper>Keyboard</Wrapper>;
    return (
        <Wrapper>
            {keyboardLayout.map((row, i) => {
                return (
                    <Row key={i}>
                        {row.map((key, i) => {
                            return <Key key={i}>{key}</Key>;
                        })}
                    </Row>
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border: 2px solid black;
    width: 100%;
`;

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
    font-size: x-large;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
`;

export default Keyboard;
