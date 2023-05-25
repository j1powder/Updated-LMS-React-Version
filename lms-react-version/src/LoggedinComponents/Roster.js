import { useState } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import useCollection from "../hooks/useCollection";
import Container  from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Roster.module.css';

const Roster = () => {
const { user } = useAuthContext();
const { documents, error } = useCollection('users');
const [isOpen, setIsOpen] = useState(false);

let thisCompany;
if(documents && user){
    documents.map((thisUser)=>{
        if(user.uid === thisUser.id){
         return  thisCompany = thisUser.company;
        }
    })
}
console.log(thisCompany)


    return <>
    <Container>
        <Row>
            <Col md={12}>
                {documents &&  documents.map((users)=>{
                    if(users.company === thisCompany){
                        return <> 
                        <ul className={classes.list}><li key={users.id} onClick={()=>{setIsOpen(users.id)}} className={classes.listItem}> {users.firstName + " " + users.lastName}<br/> {isOpen === users.id && <>
                            <Container><Row className={classes.topRow}><Col md={4}>Course</Col><Col md={4}>Score</Col><Col md={4}>Date</Col></Row></Container>
                         {users.courses.map((course)=>{
                            return <Container>
                
                                <Row><Col md={4}><div>{course.title}</div></Col><Col md={4}><div>{course.score}</div></Col><Col md={4}><div>{course.date}</div></Col></Row></Container>
                        })}
                        
                        
                        </>}   </li>
                        
                        </ul>
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