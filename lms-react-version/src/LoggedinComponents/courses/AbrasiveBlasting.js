import { Fragment, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import ReactPlayer from 'react-player';
import useCollection from '../../hooks/useCollection';
import './AerialLifts.css';
       
const AbrasiveBlasting = (props) => {

    const [openItem, setOpenItem] = useState(null);
    const [finalExamOpen, setFinalExamOpen] = useState(false);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const { documents, error } = useCollection('newcourses/Abrasive Blasting Safety/Sections')
     
const getFinalScore = (e) => {
e.preventDefault()
const final = document.getElementById('abrasiveblastingFinal');
for(let x = 0; x < final.length; x++){
    if(final[x].checked && final[x].isCorrect === 'true'){
       setTotalCorrect(score => score + 1);
       
    }
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
<form onSubmit={getFinalScore} id="abrasiveblastingFinal">
{finalExamOpen ? documents.map((section)=>{
    return <>
            
            {section.question1.isCorrect !== "I am ready to proceed" ? <>  
            <p id={section.question1.isCorrect} iscounted='true'><b key={section.question1.isCorrect}>{section.question1.questionText}</b></p>
            {section.question1.answerOptions.map((item)=>(<label key={item} className='answers' htmlFor={item}>
                <input 
                onChange={(e)=>{if(e.target.id === section.question1.isCorrect){e.target.isCorrect='true';e.target.disabled='true' } else{ e.target.isCorrect='false'; e.target.disabled='true'}}} 
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
                <input onChange={(e)=>{if(e.target.id === section.question2.isCorrect){ e.target.isCorrect='true'; e.target.disabled='true'} else{ e.target.isCorrect='false'; e.target.disabled='true'}}}
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
<Button className='btn-final' onClick={(e)=> {e.target.disabled='true'}}>Submit</Button> 
</form>
<h2>Your Final Score is: {Math.round(totalCorrect/18 *100)}%</h2>

</>
}
</Card>
</div>


}

</Fragment>
}

export default AbrasiveBlasting;