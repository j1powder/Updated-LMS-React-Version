import { Fragment } from 'react';
//import Header from "../Layout/Header";
import Banner from './AdobeStock_391430854.jpeg';
//import Footer from '../Layout/Footer';
import './Homepage.css';

const HomePage = () => {

    return <Fragment>
         <section id="bannertextsection" style={{backgroundImage: `url(${Banner})`, 
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center'}}>
         <h1>Online Learning Managment System</h1>
         {//<h2>Complete Your OSHA Training Online</h2>
}
         </section>
         {/* <img id='banner' src={Banner} alt='construction site'/> */}

        </Fragment>
}

export default HomePage;
