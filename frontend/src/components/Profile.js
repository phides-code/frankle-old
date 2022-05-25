import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GameContext } from "../GameContext";
import { UserContext } from "../UserContext";

const Profile = () => {
    const { user, isAuthenticated, isLoading, setShowingProfile } =
        useContext(UserContext);
    const { gameOver } = useContext(GameContext);
    const [userStats, setUserStats] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            const res = await fetch("/api/userstats", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.email }),
            });
            const userStats = await res.json();
            setUserStats(userStats.userStats);
        };

        if (user.email) {
            getStats();
        }
    }, [user.email, gameOver]);

    if (isLoading) {
        return <Wrapper>Loading ...</Wrapper>;
    }

    return (
        isAuthenticated && (
            <Wrapper>
                <InnerWrapper>
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        {userStats && (
                            <div>
                                <div>Games Played: {userStats.gamesPlayed}</div>
                                <div>Wins: {userStats.wins}</div>
                                <div>Losses: {userStats.losses}</div>
                                <div>
                                    Win %:{" "}
                                    {(userStats.wins / userStats.gamesPlayed) *
                                        100}
                                    %
                                </div>
                                <div>Average: {userStats.average} guesses</div>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setShowingProfile(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </InnerWrapper>
            </Wrapper>
        )
    );
};

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
    width: 100%;
`;

const InnerWrapper = styled.div`
    padding: 1rem;
    background-color: white;
    position: absolute;
    height: 90%;
    width: 82%;
    top: 4%;
    left: 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export default Profile;
