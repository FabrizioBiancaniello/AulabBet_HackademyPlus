import { useState } from 'react';


export default function Newbet({ setBet, utente }) {
    const [betDescription, setBetDescription] = useState("");
    const [message, setMessage] = useState("");

    return (

        <div className='createBetContainer text-cus position-relative'>
            <div className='d-flex justify-content-between align-items-center'>
                <h2 className='text-center'>NUOVA BET</h2>
                <h2>{utente?.bets?.length ?? 0}/3</h2>
            </div>
            {utente ? (utente.bets?.length < 3 ? (
                <div className='h-100 d-flex flex-column justify-content-evenly'>
                    {message &&
                        <div className={`alert-box alert text-center fw-bold ${message.type == "error" ? "alert-danger" : "alert-success"}`} role="alert">
                            {message.body}
                        </div>
                    }
                    <div className="d-flex flex-column">
                        <label className="fs-5 mt-3 fw-bold my-3" htmlFor="description">Descrizione Scommessa:</label>
                        <textarea className='p-2' onChange={(event) => setBetDescription(event.target.value)} value={betDescription} id="description"></textarea>
                    </div>
                    <div className="d-flex justify-content-center align-items-end">
                        <button className="btn-custom fs-5" onClick={() => setBet(betDescription, setBetDescription, setMessage, utente)}>AGGIUNGI</button>
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


    )
}