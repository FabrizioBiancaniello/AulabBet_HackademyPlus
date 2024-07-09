import { useState } from 'react';


export default function Newbet({ setBet, utente }) {
    const [betDescription, setBetDescription] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="modal fade bg-modal" id="newBet" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bet-modal">
                <div className="modal-header border-0">
                    <h3 className='text-white'><span className='text-a fs-2'>{utente?.bets?.length ?? 0}</span>/3</h3>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
        <div className='createBetContainer text-cus position-relative'>
                <h2 className='text-center text-a fs-1'>NUOVA BET</h2>
            {utente ? (utente.bets?.length < 3 ? (
                <div className='h-100 d-flex flex-column justify-content-evenly'>
                    {message &&
                        <div className={`alert-box alert text-center fw-bold ${message.type == "error" ? "alert-danger" : "alert-success"}`} role="alert">
                            {message.body}
                        </div>
                    }
                    <div className="d-flex flex-column">
                        <label className="fs-6 mt-3 fw-bold my-3 text-center" htmlFor="description">Descrizione Scommessa:</label>
                        <textarea className='p-2' onChange={(event) => setBetDescription(event.target.value)} value={betDescription} id="description"></textarea>
                    </div>
                    <div className="d-flex justify-content-center align-items-end">
                        <button className="btn-custom fs-5" onClick={() => setBet(betDescription, setBetDescription, setMessage, utente)} data-bs-dismiss="modal">AGGIUNGI</button>
                    </div>
                </div>
            ) : (
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <p className='text-center'>HAI RAGGIUNTO IL LIMITE DI BET CONSENTITO, 3.</p>
                </div>
            )) : (
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <p className='text-center'>EFFETTUA IL LOGIN O REGISTRATI PER INSERIRE LA TUA BET</p>
                </div>
            )}
        </div>
        </div>
                    </div>
                </div>
            </div>

    )
}