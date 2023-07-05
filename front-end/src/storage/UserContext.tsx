import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserContextProps {
    username: string;
    setUsername: (username: string) => void;
}

export const UserContext = createContext<UserContextProps>({
    username: '',
    setUsername: () => {}
});

interface UserContextProviderProps {
    children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('name');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleSetUsername = (newUsername: string) => {
        setUsername(newUsername);
        sessionStorage.setItem('name', newUsername);
    };

    return (
        <UserContext.Provider value={{ username, setUsername: handleSetUsername }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;