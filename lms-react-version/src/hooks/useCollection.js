import { useState, useEffect, useRef } from "react"
import { projectFirestore } from '../config'


const useCollection = (collection, _query) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    
    // if we don't use a ref, infinite loop will occur in useEffect function
    const query = useRef(_query).current
    
    
    
    useEffect(()=>{
        let ref = projectFirestore.collection(collection)
    
        if(query){
            ref = ref.where(...query)
        }
    
        
        const unsubscribe = ref.onSnapshot((snapshot)=>{
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id:doc.id })
            })
        
            //update state
            setDocuments(results)
            setError(null)
        }, (error)=>{
            console.log(error)
            setError('Could Not Fetch Data')
        })
    // unsubscribe on unmount
    return ()=> unsubscribe()
    },[collection, query])
    
    return { documents, error }
    }
    
    export default useCollection;