import { useState } from 'react';
import { projectAuth } from '../config';
import useAuthContext from './useAuthContext';

const useLogout = () => {
    //const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    
    const logout = async () => {
        setError(null)
        setIsPending(true)
    
        //sign user out
        try {
            await projectAuth.signOut()
    
            //dispatch logout action
            dispatch({ type: 'LOGOUT '})
            
            //update state 
            setIsPending(false)
            setError(null)
            window.location.reload();
            // if(!isCancelled){
    
            // }
    
        }
        catch(err){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
    
            // if(!isCancelled){
    
            // }
    
        }
    }
    
    // useEffect(()=>{
    // return () => setIsCancelled(true)
    // }, [])
    
    
    return { logout, error, isPending }
    }
    
    export default useLogout;