import { Fragment, useState, useEffect, useRef } from "react";
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
import MyCourses from "./MyCourses";


const CourseList = () => {
 const {updateDocument, response} = useFirestore('users');
 const { documents, error} = useCollection('newcourses');
 const { user } = useAuthContext();
 const [usersCollection, setUsersCollection] = useState(null);
 const [courseSelected, setCourseSelected] = useState();
 const [employeeSelected, setEmployeeSelected] = useState(); 
 
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

//console.log(userToAssign)

/* if(usersCollection){
    usersCollection.map((thisUser)=>{
        if(thisUser.firstName + " " + thisUser.lastName === employeeSelected){
            console.log(employeeSelected)

        }
    })
} */




const updateCourseHandler = async (e) => {
    if(theseCourses.includes(courseSelected) === true){
        console.log(courseSelected, employeeSelected)
    } else{
        await updateDocument(userToAssign, {courses:arrayUnion({title:courseSelected, score:"", passed:"", isAssigned:true})});
        console.log(employeeSelected, courseSelected)
    }
    
     } 

const selectCourseHandler = (e) => {
    setCourseSelected(e.target.textContent)
    e.target.style.backgroundColor='lightgray'
   // console.log(e.target.textContent)
}

const selectEmployeeHandler = (e) => {
setEmployeeSelected(e.target.textContent)
e.target.style.backgroundColor='lightgray'
//console.log(e.target.textContent)
}

console.log(courseSelected, employeeSelected)



return <Fragment>
    <Panel header="Select Course">
{user && <>
{documents && documents.map((courses)=>{
    return <>
        
        <Card key={courses.id}  className={classes.courseassign} title={courses.id} onClick={selectCourseHandler}></Card>
    </>
})

}
</>}
</Panel>
<Panel header="Select Employee">
{user && <>
{user && usersCollection && usersCollection.map((selectUser)=>{
return <>
<Card className={classes.courseassign} title={selectUser.firstName + " " + selectUser.lastName} onClick={selectEmployeeHandler}></Card>

</>

})}
<br/>
<Button onClick={updateCourseHandler}>Assign Course</Button>
</>}
</Panel>

</Fragment>
}

export default CourseList;