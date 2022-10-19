import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';

const BestTimes = () => {
    const { setShowBestTimes, bestTimes, getBestTimes, setBestTimes } =
        useContext(GameContext);

    useEffect(() => {
        const loadBestTimes = async () => {
            const data = await getBestTimes();
            setBestTimes(data);
        };
        loadBestTimes();
    }, []);

    return (
        <Wrapper>
            {bestTimes && (
                <InnerWrapper>
                    <ResultsTable>
                        {bestTimes.map((result, i) => {
                            return (
                                <Result key={i}>
                                    <div>{result.initials}</div>
                                    <div>
                                        {result.time.slice(0, 2) +
                                            ':' +
                                            result.time.slice(2, 4) +
                                            ':' +
                                            result.time.slice(4, 6) +
                                            '.' +
                                            result.time.slice(6, 9)}
                                    </div>
                                </Result>
                            );
                        })}
                    </ResultsTable>
                    <div>
                        <button
                            onClick={() => {
                                setShowBestTimes(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </InnerWrapper>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    z-index: 1000;
    /* background-color: rgba(0, 0, 0, 0.4); */
    height: 100%;
    width: 100%;
`;

const InnerWrapper = styled.div`
    border: 2px solid green;
    padding: 1rem;
    background-color: white;
    position: absolute;
    height: 33%;
    width: 82%;
    top: 5%;
    left: 5%;
`;

const Result = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: stretch;
`;

const ResultsTable = styled.div`
    margin-bottom: 1rem;
`;

export default BestTimes;
