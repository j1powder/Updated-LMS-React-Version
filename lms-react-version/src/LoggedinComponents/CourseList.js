import { Fragment, useState, useEffect } from "react";
import useCollection from "../hooks/useCollection";
import useFirestore from "../hooks/useFirestore";
import useAuthContext from "../hooks/useAuthContext";
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import {Button} from 'primereact/button'
import {arrayUnion} from 'firebase/firestore'
import 'firebase/compat/firestore'
import classes from './CourseList.module.css';
import { projectFirestore } from "../config";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const CourseList = () => {
 const {updateDocument, response} = useFirestore('users');
 const { documents, error} = useCollection('newcourses');
 const { user } = useAuthContext();
 const [usersCollection, setUsersCollection] = useState(null);
 const [courseSelected, setCourseSelected] = useState();
 const [employeeSelected, setEmployeeSelected] = useState(); 
 const [thisNewUser, setThisNewUser] = useState("");
 
useEffect(()=>{
 const ref = projectFirestore.collection('users');
 ref.onSnapshot((snapshot)=>{
let results = [];
     snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id:doc.id })
        setUsersCollection(results);
    })
 })
},[])


    let thisCompany; 

        if(usersCollection && user){
            usersCollection.map((newUser)=>{
                if(newUser.id === user.uid){
                 return  console.log(thisCompany = newUser.company);
                    
                }
            })}

console.log(thisCompany)
 

    

console.log(thisNewUser)



let theseCourses = [];
let userToAssign;
if(usersCollection){
usersCollection.map((thisUser)=>{
    if(thisUser.firstName + " " + thisUser.lastName === employeeSelected) {
        userToAssign = thisUser.id;
        thisUser.courses.map((course)=>{
        theseCourses.push(course.title);
            //console.log(theseCourses)
        })
    }
})     
} 



const updateCourseHandler = async (e) => {
    if(theseCourses.includes(courseSelected) === true){
        console.log(courseSelected, employeeSelected)
        alert(`Whoa! hold it there partner. ${courseSelected} is already assigned to ${employeeSelected}. Please try a different course`)
    } else{
        await updateDocument(userToAssign, {courses:arrayUnion({title:courseSelected, score:"",date: "", passed:"", isAssigned:true})});
        console.log(employeeSelected, courseSelected)
        alert(`Success! You just assigned ${courseSelected} to ${employeeSelected}`)
        setCourseSelected(null);
        setEmployeeSelected(null);
    }
    
     } 

const selectCourseHandler = (e) => {
   setCourseSelected(e.target.textContent)
    //e.target.style.backgroundColor='gray'
   // console.log(e.target.textContent)
}

const selectEmployeeHandler = (e) => {
setEmployeeSelected(e.target.textContent)
//e.target.style.backgroundColor='gray';
//console.log(e.target.textContent)
}

console.log(courseSelected, employeeSelected)



return <Fragment>

<Container className={classes.containers}>
<Row>
<Col md={6} className={classes.sections}>
<Panel header="Select Course">
{documents && <>
{documents.map((courses)=>{
    return <>
        
        <Card key={courses.id} style={courseSelected === courses.id ? {backgroundColor:"Gray"} : {backgroundColor:"White"}} className={classes.courseassign} title={courses.id} onClick={selectCourseHandler} onMouseEnter={(e)=>{ console.log('hello')}}></Card>
    </>
})

}
</>}
</Panel>

</Col>
<Col md={6} className={classes.sections}>
<Panel header="Select Employee">
{usersCollection && <>
{usersCollection.map((selectUser)=>{
if(selectUser.company === thisCompany){
  return  <Card className={classes.courseassign} style={employeeSelected === selectUser.firstName + " " + selectUser.lastName ? {backgroundColor:"Gray"} : {backgroundColor:"White"}} title={selectUser.firstName + " " + selectUser.lastName} onClick={selectEmployeeHandler}></Card>  
}


})}


</>}
</Panel>
</Col>
</Row>
<Row>

    <Col md={12}>
    <Button className={classes.asgnBtn} onClick={updateCourseHandler}>Assign Course</Button>
    </Col>
</Row>
</Container>



{/* <Panel header="Select Course">
{documents && <>
{documents.map((courses)=>{
    return <>
        
        <Card key={courses.id} style={courseSelected === courses.id ? {backgroundColor:"Gray"} : {backgroundColor:"White"}} className={classes.courseassign} title={courses.id} onClick={selectCourseHandler} onMouseEnter={(e)=>{ console.log('hello')}}></Card>
    </>
})

}
</>}
</Panel>
<Panel header="Select Employee">
{usersCollection && <>
{usersCollection.map((selectUser)=>{
if(selectUser.company === thisCompany){
  return  <Card className={classes.courseassign} style={employeeSelected === selectUser.firstName + " " + selectUser.lastName ? {backgroundColor:"Gray"} : {backgroundColor:"White"}} title={selectUser.firstName + " " + selectUser.lastName} onClick={selectEmployeeHandler}></Card>  
}

})}
<br/>
<Button onClick={updateCourseHandler}>Assign Course</Button>
</>}
</Panel>
 */}
</Fragment>
}

export default CourseList;