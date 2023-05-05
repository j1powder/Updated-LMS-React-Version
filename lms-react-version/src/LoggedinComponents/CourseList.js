import { Fragment, useState } from "react";
import useCollection from "../hooks/useCollection";
import useFirestore from "../hooks/useFirestore";
import useAuthContext from "../hooks/useAuthContext";
import { Card } from 'primereact/card';
import {arrayUnion} from 'firebase/firestore'
import 'firebase/compat/firestore'


const CourseList = () => {
 const {updateDocument, response} = useFirestore('users');
 const { documents, error} = useCollection('newcourses');
 const { user } = useAuthContext();

 const updateCourseHandler = async (e) => {
    await updateDocument(user.uid, {courses:e.target.textContent = {title:"", score:"", passed:""}})
    console.log(e.target.textContent)
 }

 
      
return <Fragment>
{user && <>
{documents && documents.map((courses)=>{
    return <>
        <Card title={courses.id} onClick={updateCourseHandler}></Card>
    </>
})

}
</>}
</Fragment>
}

export default CourseList;