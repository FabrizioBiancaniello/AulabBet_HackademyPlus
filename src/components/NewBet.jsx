import { useState } from 'react';


export default function Newbet({ setBet, utente, setMessage }) {
    const [betDescription, setBetDescription] = useState("");
  

    return (
        <div className="modal fade bg-modal" id="newBet" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bet-modal">
                    <div className="modal-header border-0 d-flex justify-content-between">
                        <h3 className='text-white'><span className='text-a fs-2'>{utente?.bets?.length ?? 0}</span>/3</h3>
                        <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close">
                            <i className="bi bi-x-lg fs-4 text-white"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='createBetContainer text-cus position-relative'>
                            <h2 className='text-center text-a fs-1'>NUOVA BET</h2>

                            <div className='h-100 d-flex flex-column justify-content-evenly'>
                                
                                <div className="d-flex flex-column">
                                    <label className="fs-6 mt-3 fw-bold my-3 text-center" htmlFor="description">Descrizione Scommessa:</label>
                                    <textarea className='p-2' onChange={(event) => setBetDescription(event.target.value)} value={betDescription} id="description"></textarea>
                                </div>
                                <div className="d-flex justify-content-center align-items-end">
                                    <button className="btn-custom fs-5" onClick={() => setBet(betDescription, setBetDescription, setMessage, utente)} data-bs-dismiss="modal">AGGIUNGI</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}