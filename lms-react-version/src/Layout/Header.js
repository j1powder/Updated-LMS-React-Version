import { useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import {Button} from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';
import useLogin from '../hooks/useLogin';
import useCollection from '../hooks/useCollection';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
//theme
import "primereact/resources/themes/soho-light/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
//import logo from './cropped-JJ-safety-logo3-1-1.webp';

const Header = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const { login, error, isPending } = useLogin();
    const { documents } = useCollection('users');

    const op = useRef();
    
     let items = []

    if(documents && user){
    documents.map((thisUser)=>{
        if(thisUser.id === user.uid) {
            if(user && thisUser.userPermissionLevel === "admin"){
                items = [
     
                    {label: 'Dashboard', command: () => {
                        window.location.href='/'
                    }},
                    {label: 'Course Assign', command: ()=>{
                        window.location.href='/Courselist'
            }},
                    {label: 'My Courses', command: () => {
                        window.location.href='/MyCourses'
                    }},
                ]
                } else if(user && thisUser.userPermissionLevel !== "admin"){
                    items = [
     
                        {label: 'Dashboard', command: () => {
                            window.location.href='/'
                        }},
    
                        {label: 'My Courses', command: () => {
                            window.location.href='/MyCourses'
                        }},
                    ] 
                }


        }


        })
    }
    if(!user){
        items = [
              { label: 'Home', command: () => {
                  window.location.href = '/'
              }},
          
              {label: 'Register', command: () => {
                  window.location.href='/Register'
              }}
          ]
  }




   const loginHandler = (e) => {
    e.preventDefault()
    login(email, password)
   
}


const loginBtn = <div><Button className={classes.btn} onClick={(e)=> op.current.toggle(e)}>Login</Button>    <OverlayPanel ref={op}>
<form onSubmit={loginHandler}>
    <label className={classes.label}>Username: </label><input className={classes.input} type='email' onChange={(e)=> setEmail(e.target.value)} />
    <label className={classes.label}>Password: </label><input className={classes.input} type='password' onChange={(e)=> setPassword(e.target.value)} />
    <br/>
    <Button className={classes.btn} >Submit</Button>
    <br/>
    </form>
</OverlayPanel></div>;

const logoutBtn = <Button className={classes.btn} onClick={logout}>Logout</Button>;

//const start = <img src={logo} alt="logo"/>
    return  <div className="card">
   {user && <Menubar model={items} end={logoutBtn}/> }
   {!user && <Menubar model={items} end={loginBtn}/> }
   
           



           </div> }

export default Header;