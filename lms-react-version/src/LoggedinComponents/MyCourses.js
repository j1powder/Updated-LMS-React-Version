import { Fragment, useState } from 'react';
import classes from './MyCourses.module.css';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import Certificate from '../components/Certificate';
import AllCourses from './courses/AllCourses';
import { projectStorage } from '../config';


const MyCourses = (props) => {
const [courseOpen, setCourseOpen] = useState(null);
const {documents, error} = useCollection('users');
const [show, setShow] = useState();
const [courseTitle, setCourseTitle] = useState();
const [courseDate, setCourseDate] = useState();
const { user } = useAuthContext();
const openModal = () => setShow(true);
const closeModal = () => setShow(false);

//const uploadCert = `certificates/${} `

const testData = (e) => {
    setCourseTitle(e.target.parentElement.getAttribute('id'));
    setCourseDate(e.target.parentElement.getAttribute('date'));
    setShow(true);
}

if(documents && user) {
    documents.map((newUser)=>{
        if(newUser.id === user.uid){
            newUser.courses.map((course)=>{
                return console.log(course.title)
            })
        }
    })

}


    return <Fragment>
        <Container className={classes.contMargin}>
            <Row className={classes.colMargin}>
        <Col md={6} className={classes.colMargin}>
        <Panel header="My Courses">
        {documents && documents.map((currentuser)=>{
        return <>
            {currentuser.id === user.uid ? <>
            {currentuser.courses.map((course)=>{
                return <>
                <Card className={classes.cardcomp}>
                <div className={classes.panel} onClick={()=>setCourseOpen(course.title)} >{course.title}</div>
                        
                {courseOpen === course.title && <>
                    <AllCourses courseTitle={course.title}/>
            <Button style={{backgroundColor:'gray', border: 'black'}} onClick={()=> setCourseOpen(null)}>Back to Courses</Button>
                 

            </>}
             
                </Card>
                
                </>
            })}
            
             </>: null}
         </>
        })
       
       
        }
    </Panel>
    </Col>

    <Col md={6} className={classes.colMargin}>
        <Panel  header='My Scores'>
        {documents && documents.map((currentuser)=>{
            return <> 
            {currentuser.id === user.uid ? <>

            {currentuser.courses.map((course)=>{
                return <>
                         <Container>
                    <Row date={course.date} id={course.title} className={classes.row} key={course.title}>
                        <Col className={classes.column} md={3}><p>Date:</p>{course.date}</Col>
                        <Col className={classes.column} md={3}><p>Course:</p><p>{course.title}</p></Col>
                        <Col className={classes.column} md={3}><p>Score:</p><p>{course.score + '%'}</p></Col>
                        {course.score > 79 ? <Col onClick={testData} className={classes.column} md={3} style={{textDecoration:"underline", color:"blue", cursor: "pointer"}}>View Certificate</Col> : null}
                    </Row>
                </Container><br/>
                <Modal show={show} onHide={closeModal} fullscreen size='lg'>
                <Modal.Header closeButton>
          <Modal.Title>Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  <Certificate title={courseTitle} date={courseDate} />  
        </Modal.Body>
                </Modal>

                 </>
            })}
             </>: null}
            </>
        })}
          

        </Panel>
        </Col>

    </Row>
    </Container>
    </Fragment>

}

export default MyCourses;