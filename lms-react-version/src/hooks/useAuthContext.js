import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw Error('useAuthContext must be inside an AuthcontextProvider')
    }



    return context
}

export default useAuthContext;