import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp} from "firebase/firestore";
import { useState, useEffect } from 'react'
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



function App() {
  const [bets, setBets] = useState("");
  const [betPlayerName, setBetPlayerName] = useState("");
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
            items.push({...doc.data(), id: doc.id, created: formattedDate});
        });
        setBets(items.reverse())
    });
  }

  async function setBet(){
    if(betPlayerName.length > 5 && betDescription.length > 10){
      await addDoc(collection(db, "bets"), {
          name: betPlayerName,
          description: betDescription,
          created: serverTimestamp(),
      });
      //Reset Campi
      setBetPlayerName("")
      setBetDescription("");
      setMessage({type: "correct", body: "Scommessa Inserita correttamente"})
      setTimeout(()=>{
        setMessage("")
      }, 10000)
    } else {
      setMessage({type: "error", body: "Nome o Descrizione non corretti"})
      setTimeout(()=>{
        setMessage("")
      }, 10000)
    }
}


  useEffect(()=>{

    getBet();

  },[])


  return (
    <>
      <div className="container mb-5">
        <div className="row">
            <div className="col-12">
                <h1 className="display-1 text-center border-bottom py-5 my-5">AULAB BET</h1>
            </div>
        </div>
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
                                    <label className="fs-3 fw-bold text-cus" htmlFor="playerName">Inserisci Nome</label>
                                    <input className='fs-5 p-2'  onChange={(event)=>setBetPlayerName(event.target.value)} type="text" value={betPlayerName} id='playerName'/>
                                </div>
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
                          <p className="fw-bold">Descrizione Scommessa:</p>
                          <p className="p-description">{bet.description}</p>
                          <p className="text-end fw-bold">{bet.created}</p>
                        </div>
                      </div>
                    )
                  })}
                    {/* <div className="col-12 col-md-6 col-xl-4">
                        <div className="bet-box">
                            <h4 className="text-center mb-5 border-bottom">Nome Cognome</h4>
                            <p className="fw-bold">Descrizione Scommessa:</p>
                            <p className="p-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default App
