import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from 'react'
import AccordionBet from './components/AccordionBet';
import './App.css'
import ContainerBets from './components/ContainerBets';
import Hero from './components/Hero'

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



function App() {
  const [bets, setBets] = useState("");


  async function getBet() {
    const colRef = collection(db, "bets");
    const q = query(colRef, orderBy("created"))
    onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach(doc => {
        let data = doc.data().created
        let dataLocale = data.toDate()
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = dataLocale.toLocaleDateString('it-IT', options);
        items.push({ ...doc.data(), id: doc.id, created: formattedDate });
      });
      setBets(items.reverse())
    });
  }

  async function setBet() {
    if (betPlayerName.length > 5 && betDescription.length > 10) {
      await addDoc(collection(db, "bets"), {
        name: betPlayerName,
        description: betDescription,
        created: serverTimestamp(),
      });
      //Reset Campi
      setBetPlayerName("")
      setBetDescription("");
      setMessage({ type: "correct", body: "Scommessa Inserita correttamente" })
      setTimeout(() => {
        setMessage("")
      }, 10000)
    } else {
      setMessage({ type: "error", body: "Nome o Descrizione non corretti" })
      setTimeout(() => {
        setMessage("")
      }, 10000)
    }
  }


  useEffect(() => {

    getBet();

  }, [])


  return (
    <>
      <Hero />
      {/* <!-- Contenitore Crea scommessa  --> */}
      <AccordionBet setBet={setBet} />
      {/* <!-- Contenitore Scommesse --> */}
      <ContainerBets bets={bets} />
    </>
  )
}

export default App
