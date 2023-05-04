import { Fragment, useState } from 'react';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import './Dashboard.css';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import AerialLifts from './courses/AerialLifts';
import ArcFlash from './courses/ArcFlash';
import AbrasiveBlasting from './courses/AbrasiveBlasting';
import Ammonia from './courses/AnhydrousAmmonia';
//theme
import "primereact/resources/themes/soho-light/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
//import Welcome from './Welcome';

const Dashboard = (props) => {
const [courseOpen, setCourseOpen] = useState(null);
const { user } = useAuthContext();
const { documents, error } = useCollection('newcourses');




console.log(courseOpen)


    return <Fragment>
   <Panel header="My Company Name" >
    <h1>Welcome {user.displayName}</h1>
    </Panel>
    <Panel header="courses">


    {documents && documents.map((course)=> {
        return <Card key={course.id} className="courses">
            <div className='sectionTitle' onClick={()=>setCourseOpen(course.courseTitle)} >{course.courseTitle}</div>
            {courseOpen === course.courseTitle ? <div>{course.courseTitle === "Aerial Lifts" ? <AerialLifts />: null}
                                                      {course.courseTitle === "Abrasive Blasting Safety" ? <AbrasiveBlasting/>: null}
                                                      {course.courseTitle === "Arc Flash Safety" ? <ArcFlash/> : null}
                                                      {course.courseTitle === "Anhydrous Ammonia" ? <Ammonia /> : null}
                                                <Button style={{backgroundColor:'gray', border: 'black'}} onClick={()=> setCourseOpen(null)}>Back to Courses</Button></div> :null}
           

        </Card>
    })}


    </Panel>     
</Fragment>
}

export default Dashboard; 