import { Menubar } from 'primereact/menubar';
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
     let items = []
    if(user){
        items = [
 
            { label: 'Dashboard', command: () => {
                window.location.href='/Dashboard'
            }},
            { label: 'Logout', command: logout
            }
        ]  
    } else {
    items = [
    { label: 'Home', command: () => {
        window.location.href = '/'
    }},
    { label: 'Login', command: () => {
        window.location.href='/Login'
    } },
    {label: 'Register', command: () => {
        window.location.href='/Register'
    }}
]
   }
//const start = <img src={logo} alt="logo"/>
    return  <div className="card">
    <Menubar model={items}  />
           </div>
}

export default Header;