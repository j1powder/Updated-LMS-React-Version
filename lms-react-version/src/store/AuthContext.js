import {  useReducer, useEffect, createContext } from "react";
import { projectAuth } from '../config';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
        return {...state, user: action.payload}
        
        case 'LOGOUT': 
        return {...state, user: null}
        
        case 'AUTH_READY':
            return {...state, user: action.payload, authIsReady: true}
        default:
            return state
    }
}

const AuthContextProvider = ({ children }) => {
const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
})

useEffect(()=>{
    const unsub = projectAuth.onAuthStateChanged((user)=> {
        dispatch({ type: 'AUTH_READY', payload: user })
        unsub()
    })
},[])
console.log('AuthContext', state)

return (
    <AuthContext.Provider value={{...state, dispatch}}>
        { children }
    </AuthContext.Provider>
)

}

export {AuthContext, authReducer, AuthContextProvider }