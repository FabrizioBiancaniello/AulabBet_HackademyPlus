import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD-UcNEr94I0KE5BqhuXQrGw03VU35cUuk",
    authDomain: "aulabetplus.firebaseapp.com",
    projectId: "aulabetplus",
    storageBucket: "aulabetplus.appspot.com",
    messagingSenderId: "876845694041",
    appId: "1:876845694041:web:a13b1c1caae37e4acb8548"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app)

  export {app, db, auth}