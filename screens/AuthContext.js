// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React from "react";
import {createContext, useState} from 'react';

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return(
        <AuthContext.Provider value={{email,setEmail, password, setPassword, isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};
export {AuthContext, AuthProvider};