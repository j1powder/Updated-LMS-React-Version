import {useState, useEffect, useRef} from 'react';
import Cert from './CerteVer2.jpg';
import classes from './Certificate.module.css';
import JsPDF from 'jspdf';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import Button from 'react-bootstrap/Button'

const CertificateForSC = (props) => {
    const thisCert = useRef();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const {documents, error} = useCollection('users');
    const { user } = useAuthContext();
    

    


   const mainEl = document.getElementById('report')  

    const generatePDF = () => {

        const certificate = new JsPDF('landscape','px',[thisCert.current.clientWidth * 1.05, thisCert.current.clientHeight * 1.05]);
        certificate.html(document.querySelector('#report')).then(() => {
        certificate.save('report.pdf');
        console.log(width, height)
        });
    }


/*     const setWidthandHeight = (e) => {
        setWidth(thisCert.current.clientWidth);
        setHeight(thisCert.current.clientHeight);
        console.log(width, height)
    } */



    const date = new Date();
    const todaysDate = {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
    };

  
    return <>
    {documents && documents.map((thisUser)=>{
                   if(user.uid === thisUser.id) {
                    return     <>
                    <div className={classes.main}>
                    <main id='report' className={classes.main} >
                                    <img ref={thisCert}  className={classes.certpic} src={Cert} alt="my certificate" />
                                    <div className={classes.date} style={width < 700 ? {fontSize: 8} : null}>
                                    <p>{props.date}</p>
                                    
                                    <p><b>{props.employee}</b></p>
                                    <p>Has Successfully completed</p>
                                    <p><b>{props.title}</b></p>
                                    
                                    <p>an online course authorized by <b>{thisUser.company}</b> and offered through JJ LMS.</p>
                
                                    <p>Presented By: </p>
                                    <p><b>{thisUser.company}</b></p>
                                    </div>
                    </main>
                    </div>
                    <Button className={classes.genPDF} variant='secondary' onClick={generatePDF}>Generate Certificate</Button>
                    
                </>
                 } 
    })
    
}
    </>
}

export default CertificateForSC;