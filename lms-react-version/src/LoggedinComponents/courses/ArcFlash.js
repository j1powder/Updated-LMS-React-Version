import { Fragment, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import ReactPlayer from 'react-player';
import useCollection from '../../hooks/useCollection';
import useFirestore from '../../hooks/useFirestore';
import useAuthContext from '../../hooks/useAuthContext';
import { arrayUnion } from 'firebase/firestore';
import './AerialLifts.css';
       
const ArcFlash = (props) => {

    const [openItem, setOpenItem] = useState(null);
    const [finalExamOpen, setFinalExamOpen] = useState(false);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const { documents, error } = useCollection('newcourses/Arc Flash Safety/Sections')
    const { updateDocument } = useFirestore('users');
    const { user } = useAuthContext();
     
const getFinalScore = (e) => {
e.preventDefault()
const final = document.getElementById('arcflashfinal')
for(let x = 0; x < final.length; x++){
    if(final[x].checked && final[x].isCorrect === 'true'){
       setTotalCorrect(score => score + 1);
       e.target.disabled='true';
    }
}
}

const updateScoreHandler = async (e) => {
    await updateDocument(user.uid, {courses: arrayUnion({title:"Arc Flash Safety", score: 87, passed:false})})
    console.log(e.target.textContent)
    e.target.disabled='true';
 }

 console.log(totalCorrect)


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
<form onSubmit={getFinalScore} id="arcflashfinal">
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
<Button onClick={updateScoreHandler}>Submit</Button> 
</form>
<h2>Your Final Score is: {Math.round(totalCorrect/12 *100)}%</h2>

</>
}
</Card>
</div>


}

</Fragment>
}

export default ArcFlash;