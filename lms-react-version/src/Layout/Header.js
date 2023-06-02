import { useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
//import {Button} from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';
import useLogin from '../hooks/useLogin';
import useCollection from '../hooks/useCollection';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


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
    const [show, setShow] = useState(false);
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
   console.log('function ran')
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

const openHandler = () => setShow(true);
const closeHandler = () => setShow(false);
console.log(email)
    return  <>
    
    <Navbar bg='light' variant='light' expand='sm'>
        <Container>
            <Navbar.Brand className={classes.color}>
                LMS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
            {!user && <Nav.Link href='/' className={classes.color}>Home</Nav.Link>}
            {!user && <Nav.Link href='/Register' className={classes.color}>Register</Nav.Link>}
            {user && <Nav.Link href='/' className={classes.color}>Dashboard</Nav.Link>}
            {user && documents && documents.map((thisUser)=>{
                if(thisUser.id === user.uid && thisUser.userPermissionLevel === 'admin'){
                   return <>
                   <Nav.Link href='/Courselist' className={classes.color}>Assign Courses</Nav.Link>
                   <Nav.Link href='/roster' className={classes.color}>My Employees</Nav.Link>
                   </>
                }
            })}
            {user && <Nav.Link  href='/MyCourses' className={classes.color}>My Courses</Nav.Link>}
            
            
                
                </Nav>
                <Nav>
                {!user && <>
                    <Button className={classes.loginbtn} id='dropdown-basic' onClick={openHandler}>Log In</Button>
                    <Modal show={show} onHide={closeHandler}>
                    <Modal.Body>
                    <h3>Login</h3>
    <form className={classes.padding} onSubmit={loginHandler}>
    <label className={classes.label}>Username: </label><input className={classes.input} type='email' onChange={(e)=> setEmail(e.target.value)} />
    <label className={classes.label}>Password: </label><input className={classes.input} type='password' onChange={(e)=> setPassword(e.target.value)} />
    <br/>
    <Button type="submit" className={classes.btn} >Submit</Button>
    <br/>
    </form>
    </Modal.Body>
                    </Modal>

  </>}
  {user && <Nav.Link className={classes.color} onClick={logout}>
                    Log Out
                </Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Container>

        </Navbar>

{/*    {user && <Menubar model={items} end={logoutBtn}/> }
   {!user && <Menubar model={items} end={loginBtn}/> } */}
   
           



           </> 
           }

export default Header;