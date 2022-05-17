import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { UserContext } from "../UserContext";

const Profile = () => {
    const { user, isAuthenticated, isLoading, setShowingProfile } =
        useContext(UserContext);

    if (isLoading) {
        return <Wrapper>Loading ...</Wrapper>;
    }

    return (
        isAuthenticated && (
            <Wrapper>
                <InnerWrapper>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <button
                        onClick={() => {
                            setShowingProfile(false);
                        }}
                    >
                        Close
                    </button>
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
`;

export default Profile;
