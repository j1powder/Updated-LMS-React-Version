import { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import {Button} from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';
//theme
import "primereact/resources/themes/soho-light/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
//import logo from './cropped-JJ-safety-logo3-1-1.webp';

const Header = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const op = useRef();
    console.log(op)
     let items = []
    if(user){
        items = [
 
            {label: 'Dashboard', command: () => {
                window.location.href='/Dashboard'
            }},
            {label: 'Course Assign', command: ()=>{
                window.location.href='/Courselist'
    }},
            {label: 'My Courses', command: () => {
                window.location.href='/MyCourses'
            }},
            {label: 'Logout', command: logout
            }
        ]  
    } else {
    items = [
    { label: 'Home', command: () => {
        window.location.href = '/'
    }},
    { label: 'Login', command: ()=>{
        window.location.href='/Login'
    }
     },
    {label: 'Register', command: () => {
        window.location.href='/Register'
    }}
]
   }

const loginBtn = <div><Button onClick={(e)=> op.current.toggle(e)}>Login</Button>    <OverlayPanel ref={op}>
<form>
    <label>Username: </label><input type='email' />
    <label>Password: </label><input type='password' />
    <br/>
    <Button>Submit</Button>
    <br/>
    </form>
</OverlayPanel></div>;

const logoutBtn = <Button onClick={logout}>Logout</Button>;

//const start = <img src={logo} alt="logo"/>
    return  <div className="card">
   {user && <Menubar model={items} end={logoutBtn}/>}
   {!user && <Menubar model={items} end={loginBtn}/>}
   
           </div>
}

export default Header;