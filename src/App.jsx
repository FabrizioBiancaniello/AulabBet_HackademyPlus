import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, orderBy, query, onSnapshot, serverTimestamp, arrayUnion, arrayRemove, updateDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar.jsx"
import './App.css'

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
  

  async function getBet(){
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

  async function setBet(){
    if(betDescription.length > 10){
      const docRef = await addDoc(collection(db, "bets"), {
          playerId: utente.id,
          name: utente.name,
          description: betDescription,
          created: serverTimestamp(),
          vote: []
      });
      const betRef = doc(db, "users", utente.id);

      await updateDoc(betRef, {bets: arrayUnion(docRef.id)})
      //Reset Campi
      setBetDescription("");

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
  function NotVoted(array, userId){
    let filtered = array.filter((obj)=> obj.playerId == userId)
    return (filtered.length > 0) ? false : true
  }

  function calcAverageVote(array){
    return +(array.reduce((acc, el)=> acc+el.vote, 0)/array.length).toFixed(1) || 0
  }


  useEffect(()=>{
    // console.log(auth.currentUser.uid)
    getBet();

  },[])


  return (
    <>
      <Navbar auth={auth} db={db} utente={utente} setUtente={setUtente} />
      <div className="container mb-5">
        <div className="row">
            <div className="col-12">
                <h1 className="main-title text-center border-bottom py-5 my-5">AULAB BET</h1>
            </div>
        </div>
    </div>
    <div>
      <h2 className='text-center'>CLASSIFICA</h2>

        {bets && bets.toSorted((a, b)=>b.averageVote-a.averageVote).map((bet)=>{
          return(
            <div className='bg-secondary text-center border' key={bet.id}>{bet.averageVote} - {bet.name}</div>
          )
        }) }
    </div>
    <div className="container my-5">
        <div className="row justify-content-center">
            {/* <!-- Contenitore Crea scommessa  --> */}
            <div className="col-12 col-md-12 col-xl-8 my-5 ">

                <div className="accordion accordion-flush accordion-box bg-t" id="accordionFlushExample">
                    <div className="accordion-item bg-t">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            NUOVA BET
                        </button>
                      </h2>
                      <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body p-0">
                            <div className="bet-create">
                              {/* ALERT  */}
                              {message && 
                                <div className={`alert fw-bold ${message.type == "error" ? "alert-danger" : "alert-success" }`} role="alert">
                                  {message.body}
                                </div>
                              }
                                <div className="d-flex flex-column">
                                    <label className="fs-5 mt-3 fw-bold text-cus" htmlFor="description">Descrizione Scommessa:</label>
                                    <textarea className='p-2' onChange={(event)=>setBetDescription(event.target.value)} value={betDescription} id="description"></textarea>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn-custom mt-4 fs-5" onClick={setBet}>AGGIUNGI</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
            {/* <!-- Contenitore Scommesse --> */}
            <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <h2 className="display-4 text-center my-5 border-bottom">BET ATTIVE</h2>
                        </div>
                        
                    </div>
                <div className="row" >
                  {bets && bets.map((bet)=>{
                    return (
                      <div className='col-12 col-md-6 col-xl-4 my-2' key={bet.id}>
                        <div className="bet-box">
                            <h4 className="text-center mb-5 border-bottom">{bet.name}</h4>
                          <div className='d-flex justify-content-between'>
                            <p>Media voto: <span>{bet.averageVote}</span></p>
                            <p>Numero Voti: <span>{bet.vote.length}</span></p>
                          </div>
                          <p className="fw-bold">Descrizione Scommessa:</p>
                          <p className="p-description">{bet.description}</p>
                          <p className='text-center fw-bold'>VOTA</p>
                          {utente && NotVoted(bet.vote, utente.id) &&
                          <div className='d-flex justify-content-between'>
                            <div className='vote-box' onClick={()=>updateVote(bet.id, utente.id, 1)}>1</div>
                            <div className='vote-box' onClick={()=>updateVote(bet.id, utente.id, 2)}>2</div>
                            <div className='vote-box' onClick={()=>updateVote(bet.id, utente.id, 3)}>3</div>
                            <div className='vote-box' onClick={()=>updateVote(bet.id, utente.id, 4)}>4</div>
                            <div className='vote-box' onClick={()=>updateVote(bet.id, utente.id, 5)}>5</div>
                          </div>
                          }
                          <p className="fw-bold mt-3 mb-0 text-end">{bet.created}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default App
