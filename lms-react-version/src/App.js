import { Fragment, useState, useEffect } from 'react';
import './App.css';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import HomePage from './components/Homepage';
import Register from './components/Register';
import MyCourses from './LoggedinComponents/MyCourses';
import CourseList from './LoggedinComponents/CourseList';
import Roster from './LoggedinComponents/Roster';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import useCollection from './hooks/useCollection';
//import Certificate from './components/Certificate';
//theme
//import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
//import "primereact/resources/primereact.min.css";

//icons
//import "primeicons/primeicons.css";


function App() {
  const { user, authIsReady } = useAuthContext();
  const [userExists, setUserExists] = useState(false);
  const { documents, error } = useCollection('users');
 




  useEffect(()=>{
    if(user){
      setUserExists(true);
    }
  },[userExists, user])


 
 console.log(userExists)

let permissionLevel;
if(documents && user){
documents.map((thisUser)=>{
  if(thisUser.id === user.uid){
    return console.log(permissionLevel = thisUser.userPermissionLevel)
  }
})
}

console.log(permissionLevel);
/* let router = null;


  router = createBrowserRouter([
    {path: '/', element: <HomePage currUser={user}/> },
    {path: '/Register', element: <Register currUser={user}/>  },
    {path: '/MyCourses', element: <MyCourses currUser={user} /> },
    {path: '/Courselist', element: <CourseList currUser={user}/>,}
  ]) */




  return <Fragment>
    
    {authIsReady && documents &&<>
    <Header/>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/Register' element={!user ? <Register /> : <Navigate to='/' />} />
    <Route path='/CourseList' element={user && permissionLevel === 'admin' ? <CourseList/> : <Navigate to='/' />} />
    <Route path='/MyCourses' element={user ? <MyCourses/> : <Navigate to='/'/> } />
    <Route path='/Roster' element={user && permissionLevel === 'admin' ? <Roster /> : <Navigate to='/'/>} />
    </Routes>
    </BrowserRouter>
  <Footer/>
  </>}
  </Fragment>
  
  
}

export default App;
