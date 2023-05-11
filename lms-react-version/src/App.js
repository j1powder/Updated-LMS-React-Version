import { Fragment, useState, useEffect } from 'react';
import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import HomePage from './components/Homepage';
import Register from './components/Register';
import MyCourses from './LoggedinComponents/MyCourses';
import CourseList from './LoggedinComponents/CourseList';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';

//theme
//import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
//import "primereact/resources/primereact.min.css";

//icons
//import "primeicons/primeicons.css";
const ProtectedRoute = ({user, }) => {

}

function App() {
  const { user } = useAuthContext();
  const [userExists, setUserExists] = useState(false);
 
  const ProtectedRoute = ({user, redirectPath= '/' }) => {
    if(!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  }



  useEffect(()=>{
    if(user){
      setUserExists(true);
    }
  },[userExists, user])


 
 console.log(userExists)

/* let router = null;


  router = createBrowserRouter([
    {path: '/', element: <HomePage currUser={user}/> },
    {path: '/Register', element: <Register currUser={user}/>  },
    {path: '/MyCourses', element: <MyCourses currUser={user} /> },
    {path: '/Courselist', element: <CourseList currUser={user}/>,}
  ]) */

 


  return <Fragment>
    <Header/>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage />} />
    {!user &&<Route path='/Register' element={<Register />} />}
     {user && <>
    <Route path='/CourseList' element={ <CourseList />} /> 
    <Route path='/MyCourses' element={ <MyCourses  /> } />
     </>}
    </Routes>
    </BrowserRouter>
  <Footer/>
  </Fragment>
  
  ;
}

export default App;
