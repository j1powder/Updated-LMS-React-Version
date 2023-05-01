import { Fragment, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import ReactPlayer from 'react-player';
//import { videos } from './arcflashquestions';
import useCollection from '../../hooks/useCollection';
import './AerialLifts.css';
           
const Ammonia = (props) => {
    const [openItem, setOpenItem] = useState(null);
    const [finalExamOpen, setFinalExamOpen] = useState(false)
    const { documents, error } = useCollection('newcourses/Anhydrouse Ammonia/Sections')

if(documents){
    console.log(openItem)
}
   
return <Fragment>
<p>Hello There</p>
{documents && 
    <div>
{documents.map((section)=>{
    return <>
    
    <Card key={section.id} className='coursecard' >
    <div className='courseTitle' onClick={()=> setOpenItem(section.id)}>{section.title}</div>

{openItem === section.id ? <>
            <ReactPlayer className='video-one' url={section.video}  controls></ReactPlayer>
             <form>
              <p><b>{section.question1.questionText}</b></p>
              {section.question1.answerOptions.map((item)=>(<label className='answers'><input className='answerinput' type='radio' name='selection1' />{item}</label>))}
              <br/>
              <p><b>{section.question2.questionText}</b></p>
              {section.question2.answerOptions.map((item)=>(<label className='answers'><input className='answerinput' type='radio' name='selection2' />{item}</label>))}  
              <br/>
              <br/>
              <Button type='button' style={{backgroundColor:'gray', border: 'black'}} onClick={()=> setOpenItem("")}>Close</Button>
              </form>
              </> : null
              }
        </Card>
        </>
})}
<Card className='coursecard' >
<div className='courseTitle' onClick={()=> setFinalExamOpen(true)}>Final Knowledge Check</div>
{finalExamOpen && documents.map((section)=>{
    return <>
            <form>
            {section.question1.isCorrect !== "I am ready to proceed" ? <>
            <p><b>{section.question1.questionText}</b></p>
            {section.question1.answerOptions.map((item)=>(<label className='answers'><input className='answerinput' type='radio' name='selection3' />{item}</label>))}
            </>: null}
            <p><b>{section.question2.questionText}</b></p>
            {section.question2.answerOptions.map((item)=>(<label className='answers'><input className='answerinput' type='radio' name='selection4' />{item}</label>))}
            </form>
            </>
})}
</Card>
</div>
}

</Fragment>
}

export default Ammonia;