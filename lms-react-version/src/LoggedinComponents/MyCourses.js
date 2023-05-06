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
        <Panel header="My Courses"></Panel>
        {documents && user && documents.map((currentuser)=>{
        return <>
            {currentuser.id === user.uid ? <>
            {currentuser.courses.map((course)=>{
                return <>
                <Card className={classes.cardcomp} title={course.title} onClick={()=> setCourseOpen(course.title)} >
                    
                        
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
    
    </Fragment>

}

export default MyCourses;