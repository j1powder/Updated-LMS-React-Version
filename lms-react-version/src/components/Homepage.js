import { Fragment, useState, useRef } from 'react';
import Banner from './AdobeStock_391430854.jpeg';
import classes from './Homepage.module.css';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import '../LoggedinComponents/Dashboard.css';
import { Panel } from 'primereact/panel';
import Card from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';
import useFirestore from '../hooks/useFirestore';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion';
import whiteLogo from '../assets/cropped-JJ-safety-logo3-1-1whiteversion.png';
import bbp from '../assets/bloodbornepathogens2.png';


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
        {!user ? <>
         <section className={classes.bannertextsection} style={{backgroundImage: `url(${Banner})`, 
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center'}}>
            <h1>Online Learning Managment System</h1>
        </section>
        <section>
          <Container style={{marginBottom: "2rem"}}>
            <Row>
              <Col md={12}>
                <h2 style={{textAlign:'center', margin:'1rem'}}>Complete Training At Your Convenience!</h2>
              </Col>
            </Row>
            <Row>
              <Col className={classes.thisCol} md={5}>
                <p>Introducing Fall Protection, our latest training module created to keep your workers safe from fall hazards.</p>
              </Col>
              <Col className={classes.thisCol} md={5}><p>OSHA compliance has never been simpler with our Introduction to OSHA training. Get certified today!</p></Col>
            </Row>
            <Row>
              <Col className={classes.thisCol} md={5}>
                <p>Welcome to the future of online training. Transformative learning solutions created to get you certified FAST.</p>
              <img className={classes.sectionPic} src={bbp} alt='jj safety' />
              </Col>
              <Col className={classes.thisCol} md={5}><p>Try it free for 7 days. Start getting compliant today. No commitment. Cancel anytime.</p>
              <img className={classes.sectionPic} src={bbp} alt='jj safety' />
              </Col>
              
            </Row>
            <Row>
              <h2 style={{textAlign:'center', margin:'1rem'}}>Super Easy! Super Simple!</h2>
            </Row>
            <Accordion>
              <Accordion.Item eventKey='0'>
              <Accordion.Header>What is the LMS?</Accordion.Header>
              <Accordion.Body>
              The LMS is an online learning management system for training employees to follow OSHA safety standards and to avoid penalties and fines during site visits. Access your online training anytime, anyplace and get instant grading and online certificates. The LMS interactive multimedia courses will keep your employees engaged and informed. The LMS course catalog includes both construction and general industry.
              </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
              <Accordion.Header>What are the Benefits?</Accordion.Header>
              <Accordion.Body>
              The LMS provides an affordable, customizable learning management system that your employees can access around the clock from any desktop PC, tablet, or smartphone. Get in-depth course completion reporting, instant grading, and online certificates. Our dedicated support team is here to help with any issues.              
              </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='2'>
              <Accordion.Header>How Do I Try It?</Accordion.Header>
              <Accordion.Body>
              Simply click the "Try it free" button in the upper-right corner. Call the phone number provided and we will set up your 7-day free trial.              </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='3'>
              <Accordion.Header>What Does it Cost?</Accordion.Header>
              <Accordion.Body>
              That all depends on how many employees need training. We have the pricing broken down into annual cost effective solutions for all company sizes: 1–10 employees is $100 per user per year, 11–20 employees is $95 per user per year, 21–30 employees is $90 per user per year, 31–40 employees is $85 per user per year, 41–50 employees is $80 per user per year, and for 50 or more employees give us a call for a customized price!              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </section>
        </>
: <>
<Panel className={classes.profilecard} header={"Welcome " + user.displayName} >

<h1 style={{color: '#1189dd'}}>Welcome {user.displayName}</h1>
</Panel>
<Panel header="Profile Page" className={classes.profilecard}>
<Card className={classes.profilecard}>
  <Card.Body>
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
</Card.Body>
</Card>


<Card className={classes.profilecard} title="Update Profile" >
  <Card.Body>
 <Button className={classes.profilebtn} onClick={showEditProfileHandler}>Open/Close</Button>
 {openEditProfile && 
 <div>
<Form onSubmit={updateProfile} className={classes.profileform} >
  <Form.Group>
<Form.Label>First Name: <Form.Control ref={firstName} type='text' /> </Form.Label>
<Form.Label>Last Name: <Form.Control ref={lastName} type='text' /> </Form.Label>
<Form.Label>Address: <Form.Control ref={address} type='text' /> </Form.Label>
<Form.Label>Company: <Form.Control ref={company} type='text' /> </Form.Label>
<Button type="submit"className={classes.profilebtn}>Update</Button>
</Form.Group>
</Form>
</div>}
</Card.Body>
</Card>
</Panel> 

</>}  



        </Fragment>
}

export default HomePage;
