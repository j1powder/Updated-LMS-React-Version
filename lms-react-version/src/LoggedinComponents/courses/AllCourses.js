import { Fragment, useState, useRef, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';
import useCollection from '../../hooks/useCollection';
import useFirestore from '../../hooks/useFirestore';
import useAuthContext from '../../hooks/useAuthContext';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
import './AerialLifts.css';
import { projectFirestore } from '../../config';


const AllCourses = (props) => {

    const [openItem, setOpenItem] = useState(null);
    const [finalExamOpen, setFinalExamOpen] = useState(false);
    const [scoreCalculated, setScoreCalculated] = useState(false);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [usersCollection, setUsersCollection] = useState(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [reviewAnswer1, setReviewAnswer1] = useState(null);
    const [reviewAnswer2, setReviewAnswer2] = useState(null);
    const [show, setShow] = useState(false);
    const [showAlso, setShowAlso] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const { documents, error } = useCollection(`newcourses/${props.courseTitle}/Sections`)
    const { updateDocument } = useFirestore('users');
    const { user } = useAuthContext();
    const subBtnRef = useRef();
    const finalVideo = "https://player.vimeo.com/video/455943382?h=2d45027c8e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    const finalScore = Math.round(totalCorrect/totalQuestions * 100)


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

       if(usersCollection){
       usersCollection.map((thisUser)=>{
           if(thisUser.id === user.uid) {
               thisUser.courses.map((course)=>{
                   if(course.title === props.courseTitle && course.title !== ""){
                    
                   }
                   
               })
           }
       })     
       }




const updateScoreHandler = async (e) => {
    e.preventDefault();
    if(usersCollection){
        usersCollection.map((thisUser)=>{
            if(thisUser.id === user.uid) {
                thisUser.courses.map(async(course)=>{
                    if(course.title === props.courseTitle && course.score === ""){
                        const date = new Date();
                        const todaysDate = {
                            month: 'long',
                            year: 'numeric',
                            day: 'numeric',
                        };
                        
                        await updateDocument(user.uid, {courses: arrayRemove({title:props.courseTitle, score:"", date:"", passed:"", isAssigned: true})})
                        await updateDocument(user.uid, {courses: arrayUnion({title: props.courseTitle, score:finalScore, date: date.toLocaleString('en-US', todaysDate), passed:"", isAssigned: true})})
                        console.log(finalScore)
                        e.target.disabled='true';
                    } else {
                        console.log(finalScore)
                        e.target.disabled='true';
                    }
                    
                })
            }
        })     
        }
 } 

 let myquestions = [];
const openModal = (e) => {
    e.preventDefault()
    setShow(true);
    
    if(documents){
        const questions = document.querySelectorAll('b');
        Object.values(questions).map((question)=>{
                if(question.innerText !== ""){
                    myquestions.push(question.innerText)
                    setTotalQuestions(myquestions.length);
                }
        })
    }

const final = document.getElementById('courseFinal')
for(let x = 0; x < final.length; x++){
    if(final[x].checked && final[x].isCorrect === 'true'){
       setTotalCorrect(score => score + 1);
       e.target.disabled=true;
       setScoreCalculated(true);

    }
}
}



console.log(totalQuestions)







const closeModal = () => {
    setShow(false);
}

const closeSectionModal = () => {
    setShowAlso(false)
}



//console.log(props.courseTitle)
//console.log(videoEnded)
return <Fragment>
<p >Hello There</p>
{documents && 
    <div>
{documents.map((section)=>{
    return <>
    
    <Card key={section.id} className='coursecard' >
    <div className='courseTitle' onClick={()=> {setShowAlso(true); setOpenItem(section.id); setFinalExamOpen(false)}}>{section.title}</div>
    <br/>
    <br/>
{openItem === section.id ? <>
<Modal show={showAlso} size='lg' onHide={closeSectionModal}>
    <Modal.Body>
        <br/>
            <ReactPlayer onReady={()=>{setVideoEnded(false); setReviewAnswer1(null); setReviewAnswer2(null)}} onEnded={()=>{setVideoEnded(true)}} className='video-one' url={section.video}  controls></ReactPlayer>
             <br/>
             <form>
              <p><b>{section.question1.questionText}</b></p>
              {section.question1.answerOptions.map((item)=>(<label style={videoEnded ? {fontWeight: "bold"}: null} className='answers'><input onChange={(e)=>{setReviewAnswer1(e.target.id)}} id={item} disabled={videoEnded ? false : true} className='answerinput' type='radio' name='selection1' />{item}</label>))}
              <br/>
              {reviewAnswer1 === section.question1.isCorrect && <p style={{color: "green"}}>Correct Answer!</p>}
              {reviewAnswer1 !== null && reviewAnswer1 !== section.question1.isCorrect ? <p style={{color: 'red'}}>Incorrect. The correct answer is {section.question1.isCorrect}</p> : null}


              <p><b>{section.question2.questionText}</b></p>
              {section.question2.answerOptions.map((item)=>(<label style={videoEnded ? {fontWeight: "bold"}: null} className='answers'><input onChange={(e)=>{setReviewAnswer2(e.target.id)}} id={item} disabled={videoEnded ? false: true} className='answerinput' type='radio' name='selection2'/>{item}</label>))}  
              <br/>
              {reviewAnswer2 === section.question2.isCorrect && <p style={{color: "green"}}>Correct Answer!</p>}
              {reviewAnswer2 !== null && reviewAnswer2 !== section.question2.isCorrect ? <p style={{color: 'red'}}>Incorrect. The correct answer is {section.question2.isCorrect}</p> : null}

              <br/>
              </form>
              <Button style={{backgroundColor:'gray', border: 'black'}} onClick={()=>{setOpenItem(null);} }>Close</Button>
              </Modal.Body>
    </Modal>

              </> : null
              }
              <div></div>


        </Card>
        </>
})}
<Card className='coursecard' >
<div className='courseTitle' onClick={()=> {if(openItem == null) {setShowAlso(true); setFinalExamOpen(true)}}}>Final Knowledge Check</div>



{finalExamOpen && openItem === null &&<>
<Modal show={showAlso} size='lg' onHide={closeSectionModal} fullscreen>
<Modal.Header closeButton>
          <Modal.Title>Final Exam</Modal.Title>
        </Modal.Header>
    <Modal.Body>
<form id="courseFinal">
 <br/>   
<ReactPlayer className='video-one' url={finalVideo} controls></ReactPlayer>
<br/>
{finalExamOpen ? documents.map((section)=>{
    return <>
            {section.question1.isCorrect !== "I am ready to proceed" ? <>  
            <div id={section.question1.isCorrect} iscounted='true'><b className='questions' key={section.question1.isCorrect}>{section.question1.questionText}</b></div>
            {section.question1.answerOptions.map((item)=>(<label key={item} className='answers' htmlFor={item}>
                <input 
                onChange={(e)=>{if(e.target.id === section.question1.isCorrect){e.target.disabled="true"; e.target.isCorrect='true' } else{e.target.disabled='true'; e.target.isCorrect='false'}}} 
                key={item} 
                id={item}  
                className='answerinput' 
                type='radio'
                name={section.question1.questionText} 
                />
                {item}
                </label>))}
</>: null}
<br/>
            <div key={section.question2.isCorrect} iscounted='true'><b className='questions' key={section.question2.isCorrect}>{section.question2.questionText}</b></div>
            {section.question2.answerOptions.map((item)=>(<label key={item} className='answers' htmlFor={item}>
                <input onChange={(e)=>{if(e.target.id === section.question2.isCorrect){e.target.disabled='true'; e.target.isCorrect='true'} else{e.target.disabled='true'; e.target.isCorrect='false'}}}
                key={item} 
                id={item} 
                className='answerinput' 
                type='radio'
                name={section.question2.questionText}
                />
                {item}
                </label>))}
<br/>
            
            </>
            
})


: null}
<br/>

{!scoreCalculated && <Button onClick={openModal} className='btn-final' >Submit</Button>}
<Modal  show={show} onHide={closeModal} centered>
<Modal.Body style={{backgroundColor:'whitesmoke'}}>
<h2>Your Final Score is: {finalScore}%</h2>
<p>Would you like to save this score?</p>
<br/>
<Button className='btn-final' onClick={updateScoreHandler}>Save Score</Button>
</Modal.Body>
</Modal>

</form>
</Modal.Body>
</Modal>
</>
}
</Card>
</div>


}

</Fragment>
}

export default AllCourses; 