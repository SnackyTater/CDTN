import React from 'react';

export const userContext = React.createContext();


export const HomeContext = React.createContext({
    userProfile: {},
    setUser: () => {}
});