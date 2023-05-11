import { Fragment, useState, useRef } from 'react';
import Banner from './AdobeStock_391430854.jpeg';
import './Homepage.css';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import '../LoggedinComponents/Dashboard.css';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import useFirestore from '../hooks/useFirestore';


const HomePage = () => {
//const [courseOpen, setCourseOpen] = useState(null);
const [openEditProfile, setOpenEditProfile] = useState(false); 
const { user } = useAuthContext();
const { documents, error } = useCollection('users');
const { updateDocument, response } = useFirestore('users');
const firstName = useRef();
const lastName = useRef();
const address = useRef();
const company = useRef();

const showEditProfileHandler = () => {
if(!openEditProfile){
  setOpenEditProfile(true);
} else {
  setOpenEditProfile(false);
}

}

const updateProfile = async (e) => {
 e.preventDefault();
 await updateDocument(user.uid, {address:address.current.value, company:company.current.value, firstName:firstName.current.value, lastName:lastName.current.value});
 console.log(firstName.current.value)
 firstName.current.value = '';
 lastName.current.value = '';
 company.current.value = '';
 address.current.value = '';
}
 

    return <Fragment>
        {!user ?
         <section id="bannertextsection" style={{backgroundImage: `url(${Banner})`, 
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center'}}>
            <h1>Online Learning Managment System</h1>
        </section>
: <>
<Panel header={"Welcome " + user.displayName} >

<h1>Welcome {user.displayName}</h1>
</Panel>
<Panel header="Profile Page">
<Card className='profile-card'>
  <h2>My Profile</h2>
  <br/>

{documents && user && documents.map((currUser)=>{
  return <>  {currUser.id === user.uid ? <>



    <h4>Company: {currUser.company}</h4>
    <h4>Display Name: {currUser.displayName}</h4>
    <h4>Full Name: {currUser.firstName} {currUser.lastName}</h4>
    <h4>Address: {currUser.address}</h4>
    
    </>:null} </>
})}

</Card>


<Card className='profile-card' title="Update Profile" >
 <Button className='profile-btn' onClick={showEditProfileHandler}>Open/Close</Button>
 {openEditProfile && 
 <div>
<form onSubmit={updateProfile} id='profileform'>
<label>First Name: <input ref={firstName} type='text' /> </label>
<label>Last Name: <input ref={lastName} type='text' /> </label>
<label>Address: <input ref={address} type='text' /> </label>
<label>Company: <input ref={company} type='text' /> </label>
<Button className='profile-btn'>Update</Button>
</form>
</div>}
</Card>
</Panel> 

</>}  
        </Fragment>
}

export default HomePage;
