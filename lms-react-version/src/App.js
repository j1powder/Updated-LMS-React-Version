import { Fragment } from 'react';
import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import HomePage from './components/Homepage';
import LoginPage from './components/Loginpage';
import Register from './components/Register';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Dashboard from './LoggedinComponents/Dashboard';
import useAuthContext from './hooks/useAuthContext';

//theme
//import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
//import "primereact/resources/primereact.min.css";

//icons
//import "primeicons/primeicons.css";



function App() {
  const { user } = useAuthContext();

const checkAuthIn = () => {
  if(user) {
    return redirect('/Dashboard')
  }
  return null
}
const checkAuthOut = () => {
  if(!user){
    return redirect('/')
  }
  return null
}

  const router = createBrowserRouter([
    {path: '/', element: <HomePage/>, loader:checkAuthIn},
    {path:'/Login', element: <LoginPage/>, loader: checkAuthIn},
    {path: '/Dashboard', element: <Dashboard/>, loader: checkAuthOut },
    {path: '/Register', element: <Register/>}
  ])


  return <Fragment>
    <Header/>
  <RouterProvider router={router} />
  <Footer/>
  </Fragment>
  
  ;
}

export default App;
