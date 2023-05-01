import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBmAObxO0YvUpV6IoIVDCo3FRfEiGTFU-Y",
  authDomain: "lms-react-version.firebaseapp.com",
  projectId: "lms-react-version",
  storageBucket: "lms-react-version.appspot.com",
  messagingSenderId: "311182650753",
  appId: "1:311182650753:web:123640ecd92bb47f140c80",
  measurementId: "G-VBP89RXXKQ"
};


firebase.initializeApp(firebaseConfig)

//initialize services

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth();
export { projectFirestore, projectAuth }

