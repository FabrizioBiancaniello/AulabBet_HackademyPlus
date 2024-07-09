import {db, auth} from "./utils/firebaseConfig.js"
import { collection, doc, addDoc, getDoc, where, orderBy, query, onSnapshot, serverTimestamp, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar.jsx"
import './App.css'
import ContainerBets from './components/ContainerBets';
import Hero from './components/Hero'
import Chart from './components/Chart.jsx'
import MyProfileContainer from './components/MyProfileContainer.jsx';
import Ranking from './components/Ranking.jsx';




function App() {
  const [utente, setUtente] = useState(null);
  const [bets, setBets] = useState(null);
  const [myBets, setMyBets] = useState(null);
  const [users, setUsers] = useState([]);

  async function getUtente(user) {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    setUtente(docSnap.data())
  }

  async function getBet() {
    const colRef = collection(db, "bets");
    const q = query(colRef, orderBy("created"))
    onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach(doc => {
        let data = doc.data().created
        let dataLocale = data?.toDate()
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = dataLocale.toLocaleDateString('it-IT', options);
        items.push({ ...doc.data(), id: doc.id, created: formattedDate, averageVote: calcAverageVote(doc.data().vote) });
      });
      setBets(items.reverse())

    });
  }

  async function getUsers() {
    const colRef = collection(db, "users");
    const q = query(colRef, orderBy("name"))
    onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach(doc => {
        if (doc.data().voted.length > 0) {
          items.push({ name: doc.data().name, value: (doc.data().voted[0]?.vote ? calcAverageVote(doc.data().voted) : 0), bulletSettings: { src: utente?.img ?? "/default.png" } });
        }
      });
      setUsers(items.reverse())

    });
  }

  async function getMyBets(userId) {
    const colRef = collection(db, "bets");
    const q = query(colRef, where("playerId", "==", userId), orderBy("created"))
    onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach(doc => {
        let data = doc.data().created
        let dataLocale = data?.toDate()
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = dataLocale.toLocaleDateString('it-IT', options);
        items.push({ ...doc.data(), id: doc.id, created: formattedDate, averageVote: calcAverageVote(doc.data().vote) });
      });
      setMyBets(items.reverse())
    });

  }

  async function setBet(description, setDescription, setMessage, utente) {
    if (description.length > 10) {
      const docRef = await addDoc(collection(db, "bets"), {
        playerId: utente.id,
        name: utente.name,
        description: description,
        created: serverTimestamp(),
        vote: []
      });
      const betRef = doc(db, "users", utente.id);
      await updateDoc(betRef, { bets: arrayUnion(docRef.id) })
      getUtente(utente.id)

      //Reset Campi
      setDescription("");
      setMessage({ type: "correct", body: "Scommessa Inserita correttamente" })
      setTimeout(() => {
        setMessage("")
      }, 3000)
    } else {
      setMessage({ type: "error", body: "La descrizione è troppo corta" })
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  async function updateVote(betId, userId, value) {
    const betRef = doc(db, "bets", betId);
    await updateDoc(betRef, { vote: arrayUnion({ playerId: userId, vote: value }) })
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { voted: arrayUnion({ "betId": betId, "vote": value }) })
    getUtente(utente.id)
  }

  function notVoted(array, userId) {
    let filtered = array.filter((obj) => obj.playerId == userId)
    return (filtered.length > 0) ? false : true
  }

  function calcAverageVote(array) {
    return +(array.reduce((acc, el) => acc + el.vote, 0) / array.length).toFixed(1) || 0
  }

  useEffect(() => {
    getBet();
    getUsers();
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUtente(user)
      if (user) {
        getUtente(user.uid)
        getMyBets(user.uid)
        // console.log(utente);
      } else {
        setMyBets(null)
      }
    })

  }, [auth])


  return (
    <>
      <Navbar auth={auth} db={db} utente={utente} setUtente={setUtente} calcAverageVote={calcAverageVote} getUtente={getUtente} />
      <Hero />
      <MyProfileContainer myBets={myBets} utente={utente} updateVote={updateVote} notVoted={notVoted} bets={bets} setBet={setBet} calcAverageVote={calcAverageVote} />
      <Ranking bets={bets}/>
      <Chart users={users} />
      
      {/* <!-- Contenitore SCOMMESSE inserite --> */}
      <ContainerBets bets={bets} utente={utente} updateVote={updateVote} notVoted={notVoted} />
    </>
  )
}

export default App
