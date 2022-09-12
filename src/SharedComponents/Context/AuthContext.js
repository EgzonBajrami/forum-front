import React,{ createContext} from 'react';
export const AuthContext = React.createContext({
    isLogged:false,
    login:()=>{},
    logout:()=>{}
    
});