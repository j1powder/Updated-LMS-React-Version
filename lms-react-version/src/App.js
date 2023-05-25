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
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Certificate from './components/Certificate';
//theme
//import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
//import "primereact/resources/primereact.min.css";

//icons
//import "primeicons/primeicons.css";


function App() {
  const { user } = useAuthContext();
  const [userExists, setUserExists] = useState(false);
 




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
    {user && <Route path='/CourseList' element={<CourseList/>} />} 
    {user && <Route path='/MyCourses' element={ <MyCourses/>  } />}
    {user && <Route path='/Roster' element={<Roster />} />}
    <Route path= '/Certificate' element={<Certificate />}/>  
     
    </Routes>
    </BrowserRouter>
  <Footer/>
  </Fragment>
  
  
}

export default App;
