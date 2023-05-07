import { Fragment, useState } from 'react';
import classes from './MyCourses.module.css';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import AerialLifts from './courses/AerialLifts';
import ArcFlash from './courses/ArcFlash';
import AbrasiveBlasting from './courses/AbrasiveBlasting';
import Ammonia from './courses/AnhydrousAmmonia';




const MyCourses = (props) => {
const [courseOpen, setCourseOpen] = useState(null);
const {documents, error} = useCollection('users');
const { user } = useAuthContext();






    return <Fragment>
        <Panel header='My Scores'>
        {documents && user && documents.map((currentuser)=>{
            return <> 
            {currentuser.id === user.uid ? <>
                <table className={classes.table}>
                <thead><tr><th>Course</th><th>Score %</th></tr></thead>    
                </table>
            {currentuser.courses.map((course)=>{
                return <>
                <table className={classes.table}>
                <tbody><tr><td>{course.title}</td><td>{course.score}</td></tr></tbody>    
                </table>
                 </>
            })}
             </>: null}
            </>
        })}
          

        </Panel>
        <Panel header="My Courses">
        {documents && user && documents.map((currentuser)=>{
        return <>
            {currentuser.id === user.uid ? <>
            {currentuser.courses.map((course)=>{
                return <>
                <Card className={classes.cardcomp}>
                <div className='sectionTitle' onClick={()=>setCourseOpen(course.title)} >{course.title}</div>
                        
                {courseOpen === course.title && <>
                 {course.title === "Aerial Lifts" ? <AerialLifts />: null}   
                 {course.title === "Abrasive Blasting Safety" ? <AbrasiveBlasting/>: null}
                 {course.title === "Arc Flash Safety" ? <ArcFlash/> : null}
                 {course.title === "Anhydrous Ammonia" ? <Ammonia /> : null}
                 
            <Button style={{backgroundColor:'gray', border: 'black'}} onClick={()=> setCourseOpen(null)}>Back to Courses</Button>
                 

            </>}
             
                </Card>
                
                </>
            })}
            
             </>: null}
         </>
        })
       
       
        }
    </Panel>
    </Fragment>

}

export default MyCourses;