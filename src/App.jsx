import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, orderBy, query, onSnapshot, serverTimestamp, arrayUnion, arrayRemove, updateDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar.jsx"
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
//Inizialize Firebase Auth
const auth = getAuth(app)



function App() {
  const [utente, setUtente] = useState(null);
  const [bets, setBets] = useState("");
  const [betDescription, setBetDescription] = useState("");
  const [message, setMessage] = useState("");


  async function getBet() {
    const colRef = collection(db, "bets");
    const q = query(colRef, orderBy("created"))
    onSnapshot(q, (querySnapshot)=>{
        const items = [];
        querySnapshot.forEach(doc => {
            let data = doc.data().created
            let dataLocale = data.toDate()
            const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
            const formattedDate = dataLocale.toLocaleDateString('it-IT', options);
            items.push({...doc.data(), id: doc.id, created: formattedDate, averageVote: calcAverageVote(doc.data().vote) });
        });
        setBets(items.reverse())
    });
  }
  async function setBet(description, setDescription, setMessage, utente){
    if(description.length > 10){
      const docRef = await addDoc(collection(db, "bets"), {
          playerId: utente.id,
          name: utente.name,
          description: description,
          created: serverTimestamp(),
          vote: []
      });
      const betRef = doc(db, "users", utente.id);

      await updateDoc(betRef, {bets: arrayUnion(docRef.id)})
      //Reset Campi
      setDescription("");

      setMessage({type: "correct", body: "Scommessa Inserita correttamente"})
      setTimeout(()=>{
        setMessage("")
      }, 10000)
      } else {
        setMessage({type: "error", body: "La descrizione è troppo corta"})
        setTimeout(()=>{
          setMessage("")
        }, 10000)
      }
  }
  async function updateVote(betId, userId, value){
    const betRef = doc(db, "bets", betId);
    await updateDoc(betRef, {vote: arrayUnion({playerId: userId, vote: value})})
  } 
  function notVoted(array, userId){
    let filtered = array.filter((obj)=> obj.playerId == userId)
    return (filtered.length > 0) ? false : true
  }

  function calcAverageVote(array){
    return +(array.reduce((acc, el)=> acc+el.vote, 0)/array.length).toFixed(1) || 0
  }


  useEffect(()=>{
    // console.log(auth.currentUser.uid)
    getBet();

  }, [])


  return (
    <>
      <Hero />
      {/* <!-- Contenitore Crea scommessa  --> */}
      <AccordionBet utente={utente} bets={bets} setBet={setBet} message={message} setMessage={setMessage}/>
      {/* <!-- Contenitore Scommesse --> */}
      <ContainerBets bets={bets} utente={utente} updateVote={updateVote} notVoted={notVoted}/>
      <Navbar auth={auth} db={db} utente={utente} setUtente={setUtente} />
      
    {/* <div>
      <h2 className='text-center'>CLASSIFICA</h2>

        {bets && bets.toSorted((a, b)=>b.averageVote-a.averageVote).map((bet)=>{
          return(
            <div className='bg-secondary text-center border' key={bet.id}>{bet.averageVote} - {bet.name}</div>
          )
        }) }
    </div> */}
    </>
  )
}

export default App
