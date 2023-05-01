import './Loginpage.css';
import { Card } from 'primereact/card';
import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import useAuthContext from '../hooks/useAuthContext';
//import useLogout from '../hooks/useLogout';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();
  //  const { logout } = useLogout();
    const { user } = useAuthContext();

    
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const loginHandler = (e) => {
        e.preventDefault()
        login(email, password)
        setEmail('')
        setPassword('')
    }

 




    return <Card className='logincard' title="Login">
        <form onSubmit={loginHandler}>
       
        <label>Username: </label><input type='email' onChange={(e)=> setEmail(e.target.value)} />
        <label>Password: </label><input type='password' onChange={(e)=> setPassword(e.target.value)} />
        <br/>
    {!error && !isPending && <><button className='loginbtn' >Login</button> <br/></>}
    {isPending && <><button className='loginbtn'>...Loading</button> <br/></>}
    {error && <><button className='loginbtn'>Whoops!!!</button> <br/></>}
    </form>
    

    
    </Card>
}

export default LoginPage;