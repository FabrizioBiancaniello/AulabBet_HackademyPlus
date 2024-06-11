import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


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
                                <div className="d-flex flex-column">
                                    <label className="fs-3 fw-bold text-cus" for="">Inserisci Nome</label>
                                    <input id="inputName" type="text"/>
                                </div>
                                <div className="d-flex flex-column">
                                    <label className="fs-5 mt-3 fw-bold text-cus" for="">Descrizione Scommessa:</label>
                                    <textarea name="" id="textArea"></textarea>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn-custom mt-4 fs-5">AGGIUNGI</button>
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
                <div className="row" id="betWrapper">
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
