import { Fragment, useState } from 'react';
import Banner from './AdobeStock_391430854.jpeg';
import './Homepage.css';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import '../LoggedinComponents/Dashboard.css';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import AerialLifts from '../LoggedinComponents/courses/AerialLifts';
import ArcFlash from '../LoggedinComponents/courses/ArcFlash';
import AbrasiveBlasting from '../LoggedinComponents/courses/AbrasiveBlasting';
import Ammonia from '../LoggedinComponents/courses/AnhydrousAmmonia';

const HomePage = (props) => {
console.log(props.currUser)
const [courseOpen, setCourseOpen] = useState(null);
const { user } = useAuthContext();
const { documents, error } = useCollection('newcourses');


    return <Fragment>
        {!props.currUser ?
         <section id="bannertextsection" style={{backgroundImage: `url(${Banner})`, 
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center'}}>
            <h1>Online Learning Managment System</h1>
        </section>
: <>

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


</Panel> </>}  
        </Fragment>
}

export default HomePage;
