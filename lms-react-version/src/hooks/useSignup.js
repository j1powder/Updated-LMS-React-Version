import { useEffect, useState } from 'react';
import useAuthContext from './useAuthContext';
import { projectAuth } from '../config';



const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

const signup = async (displayName, email, password) => {
    setError(null)
    setIsPending(true)

    try {
     //sign up user   
     const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    console.log(res.user)

    if (!res) {
        throw new Error('Cound not complete signup')
    }
    
    // add display name to user
    await res.user.updateProfile({ displayName: displayName })

    //dispatch login action
    dispatch({ type: 'LOGIN', payload: res.user })

    if(!isCancelled){
        setIsPending(false)
        setError(null)
    }

    }
    catch(err) {
        if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)  
        }

    }


    } 
    useEffect(()=>{
        return () => setIsCancelled(true)
        }, [])

    return { error, isPending, signup }
}

export default useSignup;