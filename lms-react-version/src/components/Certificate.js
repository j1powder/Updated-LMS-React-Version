import {useState, useEffect, useRef} from 'react';
import Cert from './CerteVer2.jpg';
import classes from './Certificate.module.css';
import JsPDF from 'jspdf';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';

const Certificate = (props) => {
    const thisCert = useRef();
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
    // console.log(window.innerHeight)
     //const certSize = document.getElementById('thisCert');


 
    const generatePDF = () => {

        const certificate = new JsPDF('landscape','px',[thisCert.current.clientWidth * 1.1, thisCert.current.clientHeight * 1.1]);
        certificate.html(document.querySelector('#report')).then(() => {
        certificate.save('report.pdf');
        console.log(width, height)
        });
    }

//useEffect(()=>{
//console.log(thisCert.current.clientWidth)
//},[])


    const setWidthandHeight = (e) => {
        setWidth(thisCert.current.clientWidth);
        setHeight(thisCert.current.clientHeight);
        console.log(width, height)
    }

//console.log(width, height)

/*     if(documents){
        console.log(documents.map((thisUser)=>{
            if(user.uid === thisUser.id) {
               return thisUser.firstName + " " + thisUser.lastName
            }
              
           }))
    }
    */

    //console.log(new Date())

    const date = new Date();
    const todaysDate = {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
    };

    //console.log(date.toLocaleString('en-US', todaysDate)) 
    return <>
    {documents && documents.map((thisUser)=>{
                   if(user.uid === thisUser.id) {
                    return     <>
                    <div className={classes.main}>
                    <main id='report' className={classes.main} >
                                    <img ref={thisCert}  className={classes.certpic} src={Cert} alt="my certificate" />
                                    <div className={classes.date} style={width < 700 ? {fontSize: 10} : null}>
                                    <h6 >{date.toLocaleString('en-US', todaysDate)}</h6>
                                    <br/>
                                    <h4 >{thisUser.firstName + ' ' + thisUser.lastName}</h4>
                                    <h6 >Has Successfully completed</h6>
                                    <h5 >{props.title}</h5>
                                    <br/>
                                    <p >an online course authorized by <b>Company Name</b> and offered through JJ LMS.</p>
                
                                    <p >Presented By: </p>
                                    <h5 >Instructor Name</h5>
                                    </div>
                    </main>
                    </div>
                    <button onClick={generatePDF}>Generate Certificate</button>
                    <button onClick={setWidthandHeight}>check size</button>
                </>
                 } 
    })
    
}
    </>
}

export default Certificate;