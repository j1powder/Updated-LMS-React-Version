import { Fragment, useState } from "react";
import useCollection from "../hooks/useCollection";
import useFirestore from "../hooks/useFirestore";
import useAuthContext from "../hooks/useAuthContext";
import { Card } from 'primereact/card';
import {arrayUnion} from 'firebase/firestore'
import 'firebase/compat/firestore'
import classes from './CourseList.module.css';


const CourseList = () => {
 const {updateDocument, response} = useFirestore('users');
 const { documents, error} = useCollection('newcourses');
 const { user } = useAuthContext();

 const updateCourseHandler = async (e) => {
    await updateDocument(user.uid, {courses:arrayUnion({title:e.target.textContent, score:"", passed:""})})
    console.log(e.target.textContent)
 }

 
      
return <Fragment>
{user && <>
{documents && documents.map((courses)=>{
    return <>
        <Card className={classes.courseassign} title={courses.id} onClick={updateCourseHandler}></Card>
    </>
})

}
</>}
</Fragment>
}

export default CourseList;