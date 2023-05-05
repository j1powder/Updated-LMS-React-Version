import classes from './Register.module.css';
import { useState, Fragment } from 'react';
import { Card } from 'primereact/card';
import useSignup from '../hooks/useSignup';

const Register = (props) => {
const [displayName, setDisplayName] = useState();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { error, isPending, signup } = useSignup();


const registerHandler = (e) => {
    e.preventDefault()
    signup(displayName, email, password)
    setDisplayName('')
    setEmail('')
    setPassword('')
    
}

    return <Fragment>
        {!props.currUser ? 
        <Card className={classes.logincard} title="Register to gain access">
    <form onSubmit={registerHandler}>
    
    <label>Pick Display Name(Choose Wisely): <input type='text' onChange={(e)=> setDisplayName(e.target.value)} /></label>
    <label>Email(this will be your username): <input type='email' onChange={(e)=> setEmail(e.target.value)} /></label>
    <label>Password: <input type='password' onChange={(e)=> setPassword(e.target.value)}  /></label>
    <br/>
    {!error && !isPending && <><button class={classes.loginbtn}>Register</button> <br/></>}
    {isPending && <><button class={classes.loginbtn}>...Loading</button> <br/></>}
    {error && <><button class={classes.loginbtn}>Whoops!!!</button> <br/></>}
</form>



</Card>
:<div><h3>Whoops, You'll need to log out to view this page</h3></div>}
</Fragment>
}

export default Register;