import React, {createContext} from 'react';

export const UserContext = createContext({
    username: '',
    userId: '',
});

const UserContextProvider = ({children}: any) => {
    return (
        <UserContext.Provider value={{username: 'Nickmercs', userId: '1'}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;