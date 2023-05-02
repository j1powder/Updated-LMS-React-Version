import { Fragment, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import ReactPlayer from 'react-player';
//import { videos } from './arcflashquestions';
import useCollection from '../../hooks/useCollection';
import './AerialLifts.css';
       
const ArcFlash = (props) => {

    const [openItem, setOpenItem] = useState(null);
    const [finalExamOpen, setFinalExamOpen] = useState(false);
    const [finalScore, setFinalScore] = useState();
    const [scorer, setScorer] = useState(0);
    const { documents, error } = useCollection('newcourses/Arc Flash Safety/Sections')

     
 const getFinalScore = () => {
 setFinalScore(Math.round(scorer / 12 * 100))
 console.log(finalScore)
 }
 console.log(finalScore)

 if(documents){
    console.log(documents.map((course)=>{
        if(course.question1.isCorrect !== "I am ready to proceed"){
        return course.question1.isCorrect
    }
    }))
} 

console.log("Hello there")

console.log(scorer)

return <Fragment>
<p >Hello There</p>
{documents && 
    <div>
{documents.map((section)=>{
    return <>
    
    <Card key={section.id} className='coursecard' >
    <div className='courseTitle' onClick={()=> setOpenItem(section.id)}>{section.title}</div>
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
              <Button style={{backgroundColor:'gray', border: 'black'}} onClick={()=> setOpenItem(" ")}>Close</Button>

              </> : null
              }
              <div></div>
        </Card>
        </>
})}
<Card className='coursecard' >
<div className='courseTitle' onClick={()=> setFinalExamOpen(true)}>Final Knowledge Check</div>
{finalExamOpen && <>
{finalExamOpen ? documents.map((section)=>{
    return <>
            <form>
            {section.question1.isCorrect !== "I am ready to proceed" ? <>  
            <p id={section.question1.isCorrect}><b key={section.question1.isCorrect}>{section.question1.questionText}</b></p>
            {section.question1.answerOptions.map((item)=>(<label key={item} className='answers' htmlFor={item}><input onChange={(e)=>{if(e.target.id === section.question1.isCorrect){setScorer(score => score + 1)}}} key={item} id={item} className='answerinput' type='radio' name='selection3'/>{item}</label>))}
</>: null}
            <p key={section.question2.isCorrect}><b key={section.question2.isCorrect}>{section.question2.questionText}</b></p>
            {section.question2.answerOptions.map((item)=>(<label key={item} className='answers' htmlFor={item}><input onChange={(e)=>{if(e.target.id === section.question2.isCorrect){setScorer(score => score + 1)}}}key={item} id={item} className='answerinput' type='radio' name='selection4' />{item}</label>))}

            </form>
            </>
            
})


: null}
<br/>
<Button onClick={getFinalScore}>Submit</Button> 

<h2>Your Final Score is: {finalScore}%</h2>

</>
}
</Card>
</div>


}

</Fragment>
}

export default ArcFlash;