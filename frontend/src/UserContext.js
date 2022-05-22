import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [showingProfile, setShowingProfile] = useState(false);

    const sendUserToDb = async () => {
        const res = await fetch(`/api/userlogin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...user }),
        });
        const loginResponse = await res.json();
        console.log(`got loginResponse.message: ${loginResponse.message}`);
    };

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Got authenticated user.");
            sendUserToDb();
        }
    }, [isAuthenticated]);

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                showingProfile,
                setShowingProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
