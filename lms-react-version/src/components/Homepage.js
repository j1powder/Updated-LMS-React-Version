import { Fragment, useState } from 'react';
import Banner from './AdobeStock_391430854.jpeg';
import './Homepage.css';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import '../LoggedinComponents/Dashboard.css';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import useFirestore from '../hooks/useFirestore';


const HomePage = (props) => {
console.log(props.currUser)
const [courseOpen, setCourseOpen] = useState(null);
const { user } = useAuthContext();
const { documents, error } = useCollection('users');
const { updateDocument, response } = useFirestore('users');




    return <Fragment>
        {!props.currUser ?
         <section id="bannertextsection" style={{backgroundImage: `url(${Banner})`, 
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center'}}>
            <h1>Online Learning Managment System</h1>
        </section>
: <>

<Panel header="My Company Name" >



<h1>Welcome {user.displayName}</h1>
</Panel>
<Panel header="my profile">
<Card className='profile-card'>
{documents && user && documents.map((currUser)=>{
  return <>  {currUser.id === user.uid ? <>
    <h4>Display Name: {currUser.displayName}</h4>
    <h4>Company: {currUser.company}</h4>
    
    </>:null} </>
})}

</Card>


<Card className='profile-card' title="Update Profile">
 <div>
<form id='profileform'>
<label>First Name: <input type='text' /> </label>
<label>Last Name: <input type='text' /> </label>
<label>Address: <input type='text' /> </label>
<label>Company: <input type='text' /> </label>
<Button className='profile-btn'>Update</Button>
</form>
</div>
</Card>
</Panel> 

</>}  
        </Fragment>
}

export default HomePage;
