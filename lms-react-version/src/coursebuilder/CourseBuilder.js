import React, { useRef, useState } from 'react';
import classes from './CourseBuilder.module.css';
import useCollection from '../hooks/useCollection';
import useFirestore from '../hooks/useFirestore';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { projectFirestore, timestamp } from '../config';

const CourseBuilder = () => {
const { addDocument, updateDocument } = useFirestore('newcourses');
const { documents, error} = useCollection('newcourses');
const [counter, setCounter] = useState(1);
const courseName = useRef();
const sectionTitle = useRef();
const sectionVideo = useRef();
const sectionNumber = useRef();
const question1 = useRef();
const question2 =useRef();
const q1Correct = useRef();
const q2Correct = useRef();
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
        const createdAt = timestamp.fromDate(new Date())
        const customId = courseName.current.value;
        const coursesCollectionRef = projectFirestore.collection('newcourses');
        const newDocRef = coursesCollectionRef.doc(customId);

        await newDocRef.set({courseTitle: courseName.current.value});
        console.log('course created successfully');
        alert(`${courseName.current.value} has been created successfully`)
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
const createdAt = timestamp.fromDate(new Date())

await subDocRef.set({
    createdAt: createdAt,
    orderNumber: parseFloat(sectionNumber.current.value),
    title:sectionTitle.current.value,
    video:sectionVideo.current.value,
    question1:{
        questionText:question1.current.value,
        answerOptions:[answer1.current.value !== "" ? answer1.current.value : null, answer2.current.value !=="" ? answer2.current.value : null, answer3.current.value !=="" ? answer3.current.value : null, answer4.current.value !=="" ? answer4.current.value : null],
        isCorrect:q1Correct.current.value
    },
    question2:{
        questionText: question2.current.value,
        answerOptions:[answer5.current.value !== "" ? answer5.current.value : null, answer6.current.value !=="" ? answer6.current.value : null, answer7.current.value !=="" ? answer7.current.value : null, answer8.current.value !=="" ? answer8.current.value : null],
        isCorrect:q2Correct.current.value
    }
});

sectionTitle.current.value ="";
sectionVideo.current.value = "";
question1.current.value = "";
question2.current.value = "";
q1Correct.current.value = "";
q2Correct.current.value = "";
answer1.current.value = "";
answer2.current.value = "";
answer3.current.value = "";
answer4.current.value = "";
answer5.current.value = "";
answer6.current.value = "";
answer7.current.value = "";
answer8.current.value = "";

addToCounter();
console.log('section added successfully', subDocRef.id);
alert(`section was successfully added to ${courseName.current.value}`)
} catch(error) {
    console.error('Error creating subcollection document:', error);

}
}

const addToCounter = () => {
    setCounter(score => score + 1)
}

    return <div>
        <Container>

    <h2>Need to create a new course?</h2>
    <h4>Please read the instructions below in order to create a new course</h4>
    <h5>1. Enter Course Name in the Top Fied and Click "Add". This adds the course</h5>
    <h5>2. Next Add Sections. Each Section allows a video and 2 review questions. The videos can be added from vimeo or youtube. You only need to enter the https address of the video. </h5>
    <h5>3. Adding questions, you can add 2 questions per section. You can have multiple choice answers with up to 4 options. Make sure the correct answer text matches the answer option text. </h5>

    <Form>
        <Form.Group>
        <Form.Label style={{width: '90%'}} className={classes.margin}>Course Name:<Form.Control className={classes.margin} ref={courseName} type='text'/></Form.Label><br/>
        <Button className={classes.margin} onClick={createNewCourseWithId} variant='primary'>Add</Button>
        </Form.Group>
    </Form>
    <br/>
    <h2>Add Sections</h2>
    <Form className={classes.entireform}>
        <Form.Label className={classes.cbuilderlabel}>Section Title</Form.Label><Form.Control ref={sectionTitle} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>Section Order Number</Form.Label><Form.Control ref={sectionNumber} type='number' value={counter} />
        <Form.Label className={classes.cbuilderlabel}>Add Video</Form.Label><Form.Control ref={sectionVideo} type='text'/>
        <br/><br/>
        <Form.Label className={classes.cbuilderlabel}><b>Question 1</b></Form.Label><Form.Control ref={question1} type='text'/>
        <p className={classes.answers}>Answer Options</p>
        <Form.Label className={classes.cbuilderlabel}>answer: </Form.Label><Form.Control ref={answer1} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>answer: </Form.Label><Form.Control ref={answer2} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>answer: </Form.Label><Form.Control ref={answer3} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>answer: </Form.Label><Form.Control ref={answer4} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>Correct Answer: </Form.Label><Form.Control ref={q1Correct} type='text'/>

        
        <br/><br/>
        <Form.Label className={classes.cbuilderlabel}><b>Question 2</b></Form.Label><Form.Control ref={question2} type='text'/>
        <p className={classes.answers}>Answer Options</p>
        <Form.Label className={classes.cbuilderlabel}>answer: </Form.Label><Form.Control ref={answer5} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>answer: </Form.Label><Form.Control ref={answer6} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>answer: </Form.Label><Form.Control ref={answer7} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>answer: </Form.Label><Form.Control ref={answer8} type='text'/>
        <Form.Label className={classes.cbuilderlabel}>Correct Answer: </Form.Label><Form.Control ref={q2Correct} type='text'/>
 
        <br/>
        <br/>
        <Button onClick={createSubCollection}>Add Section</Button>
    </Form>
    </Container>
    </div>
}

export default CourseBuilder;