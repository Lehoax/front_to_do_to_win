import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [token, setToken] = useState(() => {
        return localStorage.getItem('accessToken') || null;
    });

    useEffect(() => {
        setIsConnected(!!token);
    }, [token]);

    const storeToken = (newToken) => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
        setIsConnected(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken(null);
        setIsConnected(false);
    };

    return (
        <AuthContext.Provider  value={{ isConnected, setIsConnected, token, storeToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
