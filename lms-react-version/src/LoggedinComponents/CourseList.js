import { Fragment, useState, useEffect } from "react";
import useCollection from "../hooks/useCollection";
import useFirestore from "../hooks/useFirestore";
import useAuthContext from "../hooks/useAuthContext";
import { Card } from 'primereact/card';
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
if(usersCollection){
usersCollection.map((thisUser)=>{
    if(thisUser.id === user.uid) {
        thisUser.courses.map((course)=>{
            theseCourses.push(course.title);
            //console.log(theseCourses)
        })
    }
})     
}

console.log(theseCourses)

const updateCourseHandler = async (e) => {
    if(theseCourses.includes(e.target.textContent) === true){
        console.log(e.target.textContent)
    } else{
        await updateDocument(user.uid, {courses:arrayUnion({title:e.target.textContent, score:"", passed:"", isAssigned:true})});
        console.log(e.target.textContent)
    }
    
     }


return <Fragment>
{user && <>
{documents && documents.map((courses)=>{
    return <>
        
        <Card  className={classes.courseassign} title={courses.id} onClick={updateCourseHandler}></Card>
    </>
})

}
</>}
</Fragment>
}

export default CourseList;