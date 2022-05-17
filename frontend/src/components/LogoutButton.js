import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../UserContext";

const LogoutButton = () => {
    const { logout } = useAuth0();
    // const { setCurrentUser } = useContext(UserContext);

    return (
        <button
            onClick={() => {
                // setCurrentUser(null);
                logout({ returnTo: window.location.origin });
            }}
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
