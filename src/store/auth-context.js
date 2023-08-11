import React, { useState } from 'react';

const AuthContext=React.createContext(
    {
        token:'',
        isLoggedIn:false,
        logIn:(token)=>{},
        logOut:()=>{}
    }
)
export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token:');
        const [token,setToken]=useState(initialToken);
        const userIsLogedIn=!!token;
        setInterval(() => {
            const currentTime = new Date().getTime();
            const loginTime = parseInt(localStorage.getItem('loginTime:'));
            if (currentTime - loginTime > 300000) {
                logOutHandler();
            }
        }, 10000); // Check every 10 seconds
        
        const logInHandler=(token)=>{
            setToken(token);
            const currentTime = new Date().getTime();
            localStorage.setItem('token:', token);
            localStorage.setItem('loginTime:', currentTime);
        }
        const logOutHandler=()=>{
            setToken(null);
            localStorage.removeItem('token:');
        }
        const contextValue={
            token:token,
            isLoggedIn:userIsLogedIn,
            logIn:logInHandler,
            logOut:logOutHandler
        }
        return (
            <AuthContext.Provider value={contextValue}>
                {props.children}
            </AuthContext.Provider>
        )
}
export default AuthContext;