import { useState } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import useCollection from "../hooks/useCollection";
import Container  from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Roster.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import CertificateForSC from '../components/CertificateForSC';

const Roster = () => {
const { user } = useAuthContext();
const { documents, error } = useCollection('users');
const [isOpen, setIsOpen] = useState(false);
const [show, setShow] = useState(false);
const [showAlso, setShowAlso] = useState(false);
const [courseTitle, setCourseTitle] = useState();
const [courseDate, setCourseDate] = useState();
const [courseScore, setCourseScore] = useState();

let thisCompany;
if(documents && user){
    documents.map((thisUser)=>{
        if(user.uid === thisUser.id){
         return  thisCompany = thisUser.company;
        }
    })
}
//console.log(thisCompany)

const openModal = () => {
    setShow(true);
   
}

const closeModal = () => {
    setShow(false);
}

const closeCertModal = () =>{
    setShowAlso(false);
}

    return <>
    <Container className={classes.body}>
        <Row className={classes.idealMargin}>
            <div className={classes.title}>Full Employee Rosters</div>
            <Col md={12}>
                {documents &&  documents.map((users)=>{
                    if(users.company === thisCompany){
                        return <> 
                        <Container>
                            <Card className={classes.cardstyles}>
                                <Card.Body>
                            <Row onClick={()=>{setShow(true); setIsOpen(users.id)}} >
                            <Col sm={2} key={users.id} >Employee: </Col>
                            <Col sm={10}>{users.firstName + " " + users.lastName}</Col>
                            </Row>
                            </Card.Body>
                            </Card>
                        </Container>

                      {/*   <table className={classes.fullTable}>
                           <thead><tr key={users.id} onClick={()=>{setShow(true); setIsOpen(users.id)}} className={classes.tableRow}><th className={classes.tableHead}>Employee: </th><td className={classes.tableData}>{users.firstName + " " + users.lastName}</td></tr></thead> 
                        </table> */}
                        {isOpen === users.id &&
                        <Modal show={show} size='lg' onHide={closeModal}>
                            <Modal.Body>
                                {users.firstName + " " + users.lastName}
                                <table className={classes.fullTable}>
                                <thead>
                                    <tr className={classes.tableRow}><th className={classes.tableHead}>Course</th><th className={classes.tableHead}>Score</th><th className={classes.tableHead}>Date</th></tr>
                                </thead>
                                <tbody>
                                {users.courses.map((course)=>{
                            return <><tr key={course.score} className={classes.tableRow} onClick={()=>{setShowAlso(true); setCourseDate(course.date); setCourseScore(course.score); setCourseTitle(course.title)}}>
                                
                                    <td className={classes.tableData} md={4}><div>{course.title}</div></td>
                                    <td className={classes.tableData} md={4}><div>{course.score}</div></td>
                                    <td className={classes.tableData} md={4}><div>{course.date}</div></td>

                            </tr>
                            <Modal show={showAlso} onHide={closeCertModal} fullscreen>
                                <Modal.Header closeButton><Modal.Title>Certificate</Modal.Title></Modal.Header>
                                
                                <Modal.Body>
                                    
                                {courseScore > 79 ? <CertificateForSC employee={users.firstName + " " + users.lastName} title={courseTitle} date={courseDate} score={courseScore} /> : <h3>Sorry, 80% is needed to generate a certificate of completion.</h3>
                                }
                                </Modal.Body> 
                                
                            </Modal> 
                            
                            </>
                        })}

                                </tbody>
                                </table>
                            </Modal.Body>
                        </Modal>
                    }

                        
                       
 {/*                        <ul className={classes.list}><li key={users.id} onClick={!isOpen ? ()=>{setIsOpen(users.id)} : ()=>{setIsOpen(null)}} className={classes.listItem}> {users.firstName + " " + users.lastName}<br/> {isOpen === users.id && <>
                            <Container>
                                <Row className={classes.topRow}>
                                <Col className={classes.border} md={4}>Course</Col>
                                <Col className={classes.border} md={4}>Score</Col>
                                <Col className={classes.border} md={4}>Date</Col>
                                </Row>
                                </Container>
                         {users.courses.map((course)=>{
                            return <Container>
                                <Row>
                                    <Col className={classes.border} md={4}><div>{course.title}</div></Col>
                                    <Col className={classes.border} md={4}><div>{course.score}</div></Col>
                                    <Col className={classes.border} md={4}><div>{course.date}</div></Col>
                                </Row>
                            </Container>
                        })}
                         
                        
                        </>}   
                        </li>
                        </ul> */}
                        
                        </>
                    }
                   
                })

                }
            </Col>
        </Row>
    </Container>
    
    </>
}

export default Roster;