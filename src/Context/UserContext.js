// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const updateUser = (userData) => {
        setUser(userData); 
    };

    const completeTask = (taskID) => {
        if (user && user.tasks) {
            const updatedTasks = user.tasks.filter(task => task.id !== taskID); 
            setUser(prevUser => ({ ...prevUser, tasks: updatedTasks }));
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, completeTask }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
