import React, { useRef } from 'react';
import classes from './CourseBuilder.module.css';
import useCollection from '../hooks/useCollection';
import useFirestore from '../hooks/useFirestore';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { projectFirestore } from '../config';

const CourseBuilder = () => {
const { addDocument, updateDocument } = useFirestore('newcourses');
const { documents, error} = useCollection('newcourses');
const courseName = useRef();
const sectionTitle = useRef();
const sectionVideo = useRef();
const question1 = useRef();
const question2 =useRef();
const answer1 = useRef();
const answer2 = useRef();
const answer3 = useRef();
const answer4 = useRef();

const answer5 = useRef();
const answer6 = useRef();
const answer7 = useRef();
const answer8 = useRef();

const createNewCourseWithId = async () => {
    try {
        const customId = courseName.current.value;
        const coursesCollectionRef = projectFirestore.collection('newcourses');
        const newDocRef = coursesCollectionRef.doc(customId);

        await newDocRef.set({courseTitle: courseName.current.value});
        console.log('course created successfully');
    } catch (error) {
        console.error('Error creating document', error);

    }
}

const createSubCollection = async () => {
try{
const parentId = courseName.current.value;
const parentDocRef = projectFirestore.collection('newcourses').doc(parentId);

const subcollectionRef = parentDocRef.collection('Sections');
const subDocRef = subcollectionRef.doc(sectionTitle.current.value);

await subDocRef.set({
    title:sectionTitle.current.value,
    video:sectionVideo.current.value,
    question1:{
        questionText:question1.current.value,
        answerOptions:[answer1.current.value, answer2.current.value, answer3.current.value, answer4.current.value],
        isCorrect:""
    },
    question2:{
        questionText: question2.current.value,
        answerOptions:[answer5.current.value !=="" && answer5.current.value, answer6.current.value, answer7.current.value, answer8.current.value],
        isCorrect:""
    }
});


console.log('section added successfully', subDocRef.id);
} catch(error) {
    console.error('Error creating subcollection document:', error);

}
}


    return <div>
    <h1>Here is some text for the course builder</h1>

    <h2>So you want to create a new course huh?</h2>
    <h4>Fill out the below fields to add your course</h4>


    <form>
        <label className={classes.margin}>Course Name:<input className={classes.margin} ref={courseName} type='text'/></label>
        <Button className={classes.margin} onClick={createNewCourseWithId} variant='primary'>Add</Button>
    </form>
    <br/>
    <h2>Add Sections</h2>
    <form className={classes.entireform}>
        <label className={classes.cbuilderlabel}>Section Title</label><input ref={sectionTitle} type='text'/>
        <label className={classes.cbuilderlabel}>Add Video</label><input ref={sectionVideo} type='text'/>
        <label className={classes.cbuilderlabel}>Question 1</label><input ref={question1} type='text'/>
        <p>Answers</p>
        <label className={classes.cbuilderlabel}>answer: </label><input ref={answer1} type='text'/>
        <label className={classes.cbuilderlabel}>answer: </label><input ref={answer2} type='text'/>
        <label className={classes.cbuilderlabel}>answer: </label><input ref={answer3} type='text'/>
        <label className={classes.cbuilderlabel}>answer: </label><input ref={answer4} type='text'/>

        <label className={classes.cbuilderlabel}>Question 2</label><input ref={question2} type='text'/>
        <p>Answers</p>
        <label className={classes.cbuilderlabel}>answer: </label><input ref={answer5} type='text'/>
        <label className={classes.cbuilderlabel}>answer: </label><input ref={answer6} type='text'/>
        <label className={classes.cbuilderlabel}>answer: </label><input ref={answer7} type='text'/>
        <label className={classes.cbuilderlabel}>answer: </label><input ref={answer8} type='text'/> 
        <br/>
        <br/>
        <Button onClick={createSubCollection}>Add Section</Button>
    </form>

    </div>
}

export default CourseBuilder;