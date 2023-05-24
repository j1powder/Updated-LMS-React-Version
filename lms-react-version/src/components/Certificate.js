import {useState} from 'react';
import Cert from './CerteVer2.jpg';
import classes from './Certificate.module.css';
import JsPDF from 'jspdf';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';

const Certificate = () => {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const {documents, error} = useCollection('users');
    const { user } = useAuthContext();
  /*   const input = document.getElementById('report');
     html2canvas(input).then((canvas)=>{
        const imgData = canvas.toDataUrl('')
     }) */
    // const certificate = new JsPDF('landscape','px','a2');
    // const width = certificate.internal.pageSize.getWidth();
    // const height = certificate.internal.pageSize.getHeight();
    //const width = window.innerWidth;
   // const height = window.innerHeight;
   const mainEl = document.getElementById('report')  
   console.log(window.getComputedStyle(mainEl).width)
     console.log(window.innerHeight)

    const generatePDF = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        const certificate = new JsPDF('landscape','px',[width * 1.2, height * 1.4]);
        certificate.html(document.querySelector('#report')).then(() => {
        certificate.save('report.pdf');
        });
    }
    if(documents){
        console.log(documents.map((thisUser)=>{
            if(user.uid === thisUser.id) {
               return thisUser.firstName + " " + thisUser.lastName
            }
              
           }))
    }
    console.log(new Date())
    const date = new Date();
    const todaysDate = {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
    };
    console.log(date.toLocaleString('en-US', todaysDate))
    return <>
    {documents && documents.map((thisUser)=>{
                   if(user.uid === thisUser.id) {
                    return     <>
                    <div >
                    <main id='report' className={classes.main} >
                                    <img className={classes.certpic} src={Cert} />
                                    <div className={classes.date}>
                                    <h6 >{date.toLocaleString('en-US', todaysDate)}</h6>
                                    <br/>
                                    <h4 >{thisUser.firstName + ' ' + thisUser.lastName}</h4>
                                    <h6 >Has Successfully completed</h6>
                                    <h5 >Course Name</h5>
                                    <br/>
                                    <p >an online course authorized by <b>Company Name</b> and offered through JJ LMS.</p>
                
                                    <p >Presented By: </p>
                                    <h5 >Instructor Name</h5>
                                    </div>
                    </main>
                    </div>
                    <button onClick={generatePDF}>Generate Certificate</button>
                </>
                 } 
    })
    
}
    </>
}

export default Certificate;