import React, { createContext, useContext, useState } from 'react';

const NavContext = createContext();

export const NavProvider = ({ children }) => {
    const [CurrentPage, setCurrentPage] = useState('mytask');

    return (
        <NavContext.Provider value={{ CurrentPage, setCurrentPage }}>
            {children}
        </NavContext.Provider>
    );
};

export const useNav = () => {
    return useContext(NavContext);
};