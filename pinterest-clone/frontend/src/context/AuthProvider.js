import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // const userType = "customerUsers";


    //When we sign in parse the login data or initialize everything to zero
    const loginSession = JSON.parse(sessionStorage.getItem("login")) || {
        _id: null,
        username: null,
        companyName: null,
        token: null,
    };

    const [currentUser, setCurrentUser] = useState(loginSession);


    useEffect(() => {
        sessionStorage.setItem("login", JSON.stringify({ ...currentUser }));
    }, [currentUser]);


    return (
        //using AuthContext as a createContext
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );

};
