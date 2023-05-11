import { Fragment, useState, useRef, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import ReactPlayer from 'react-player';
import useCollection from '../../hooks/useCollection';
import useFirestore from '../../hooks/useFirestore';
import useAuthContext from '../../hooks/useAuthContext';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
import './AerialLifts.css';
import { projectFirestore } from '../../config';
       
const AerialLifts = (props) => {

    const [openItem, setOpenItem] = useState(null);
    const [finalExamOpen, setFinalExamOpen] = useState(false);
    const [scoreCalculated, setScoreCalculated] = useState(false);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [usersCollection, setUsersCollection] = useState(null);
    const { documents, error } = useCollection('newcourses/Aerial Lifts/Sections')
    const { updateDocument } = useFirestore('users');
    const { user } = useAuthContext();
    const subBtnRef = useRef();
    const finalVideo = "https://player.vimeo.com/video/455943382?h=2d45027c8e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"

    const finalScore = Math.round(totalCorrect/13 * 100)

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



const getFinalScore = async (e) => {
e.preventDefault()
const final = document.getElementById('aerialLiftsfinal')
for(let x = 0; x < final.length; x++){
    if(final[x].checked && final[x].isCorrect === 'true'){
       setTotalCorrect(score => score + 1);
       e.target.disabled=true;
       setScoreCalculated(true);

    }
}

}


const updateScoreHandler = async (e) => {
    e.preventDefault();
    if(usersCollection){
        usersCollection.map((thisUser)=>{
            if(thisUser.id === user.uid) {
                thisUser.courses.map(async(course)=>{
                    if(course.title === 'Aerial Lifts' && course.score === ""){
                        await updateDocument(user.uid, {courses: arrayRemove({title:"Aerial Lifts", score:"", passed:"", isAssigned: true})})
                        await updateDocument(user.uid, {courses: arrayUnion({title:"Aerial Lifts", score:finalScore, passed:"", isAssigned: true})})
                        console.log(finalScore)
                        e.target.disabled='true';
                        return
                    } else {
                        console.log(finalScore)
                        e.target.disabled='true';
                        
                    }
                    
                })
            }
        })     
        }
 } 




return <Fragment>
<p >Hello There</p>
{documents && 
    <div>
{documents.map((section)=>{
    return <>
    
    <Card key={section.id} className='coursecard' >
    <div className='courseTitle' onClick={()=> {setOpenItem(section.id); setFinalExamOpen(false)}}>{section.title}</div>
    <br/>
    <br/>
{openItem === section.id ? <>
            <ReactPlayer className='video-one' url={section.video}  controls></ReactPlayer>
             <form>
              <p><b>{section.question1.questionText}</b></p>
              {section.question1.answerOptions.map((item)=>(<label className='answers'><input  className='answerinput' type='radio' name='selection1' />{item}</label>))}
              <br/>
              <p><b>{section.question2.questionText}</b></p>
              {section.question2.answerOptions.map((item)=>(<label className='answers'><input className='answerinput' type='radio' name='selection2'/>{item}</label>))}  
              <br/>
              <br/>
              </form>
              <Button style={{backgroundColor:'gray', border: 'black'}} onClick={()=>{setOpenItem(null);} }>Close</Button>

              </> : null
              }
              <div></div>


        </Card>
        </>
})}
<Card className='coursecard' >
<div className='courseTitle' onClick={()=> {if(openItem == null) {setFinalExamOpen(true)}}}>Final Knowledge Check</div>
{finalExamOpen && openItem === null &&<>
<form id="aerialLiftsfinal">
<br/>   
<ReactPlayer className='video-one' url={finalVideo} controls></ReactPlayer>
<br/>
{finalExamOpen ? documents.map((section)=>{
    return <>
            
            {section.question1.isCorrect !== "I am ready to proceed" ? <>  
            <p id={section.question1.isCorrect} iscounted='true'><b key={section.question1.isCorrect}>{section.question1.questionText}</b></p>
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
            <p key={section.question2.isCorrect} iscounted='true'><b key={section.question2.isCorrect}>{section.question2.questionText}</b></p>
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

            
            </>
            
})


: null}
<br/>

{!scoreCalculated && <Button ref={subBtnRef} onClick={getFinalScore} className='btn-final' >Submit</Button>}
{scoreCalculated && <Button className='btn-final' onClick={updateScoreHandler}>Save</Button>} 
</form>
<h2>Your Final Score is: {finalScore}%</h2>

</>
}
</Card>
</div>


}

</Fragment>
}

export default AerialLifts;