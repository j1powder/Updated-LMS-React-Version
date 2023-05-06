import { Fragment } from 'react';
import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import HomePage from './components/Homepage';
import Register from './components/Register';
import MyCourses from './LoggedinComponents/MyCourses';
import CourseList from './LoggedinComponents/CourseList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';

//theme
//import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
//import "primereact/resources/primereact.min.css";

//icons
//import "primeicons/primeicons.css";



function App() {
  const { user } = useAuthContext();


 
 console.log(user)

let router = null;


  router = createBrowserRouter([
    {path: '/', element: <HomePage currUser={user}/> },
    {path: '/Register', element: <Register currUser={user}/>  },
    {path: '/MyCourses', element: <MyCourses currUser={user} /> },
    {path: '/Courselist', element: <CourseList currUser={user}/>,}
  ])

 


  return <Fragment>
    <Header/>
  <RouterProvider router={router} />
  <Footer/>
  </Fragment>
  
  ;
}

export default App;
