import { useState } from 'react';

export default function AccordionBet({ setBet }) {
    const [betPlayerName, setBetPlayerName] = useState("");
    const [betDescription, setBetDescription] = useState("");
    const [message, setMessage] = useState("");

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-around">
                    {/* LEFT COL  */}
                    <div className="col-12 col-md-4">
                        <div className="accordion accordion-flush accordion-box bg-t" id="accordionFlushExample">
                            <div className="accordion-item bg-t ">
                                <h2 className="accordion-header ">
                                    <button className="accordion-button collapsed accordion-button rounded-top-3" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        NUOVA BET
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body p-0">
                                        <div className="bet-create">
                                            {/* ALERT  */}
                                            {message &&
                                                <div className={`alert fw-bold ${message.type == "error" ? "alert-danger" : "alert-success"}`} role="alert">
                                                    {message.body}
                                                </div>
                                            }
                                            <div className="d-flex flex-column">
                                                <label className="fs-3 fw-bold text-cus" htmlFor="playerName">Inserisci Nome</label>
                                                <input className='fs-5 p-2' onChange={(event) => setBetPlayerName(event.target.value)} type="text" value={betPlayerName} id='playerName' />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <label className="fs-5 mt-3 fw-bold text-cus" htmlFor="description">Descrizione Scommessa:</label>
                                                <textarea className='p-2' onChange={(event) => setBetDescription(event.target.value)} value={betDescription} id="description"></textarea>
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
                    {/* RIGHT COL  */}
                    <div className="col-12 col-md-7 px-3 rankingContainer rounded-3 shadow-lg">
                        <h3 className='text-center my-4'>A CLASSIFICA</h3>
                        <div className='row'>
                            <div className="col-12">
                                <div className="row mb-2 px-2">
                                    <div className="col-3 p-0">
                                        <h4>NOME E COGNOME</h4>
                                    </div>
                                    <div className="col-6 p-0">
                                        <h4>BET</h4>
                                    </div>
                                    {/* QUI SE CICLANO E PERSONE */}
                                    <div className="col-12 bg-bet rounded my-1">
                                        <div className="row ">
                                            <div className="col-3">
                                                <div className='rankingPlayer py-2 mb-1'>
                                                    <p className='m-0'>Lorenzo Lettieri</p>
                                                </div>
                                            </div>
                                            <div className="col-9">
                                                <div className='rankingPlayer py-2 mb-1'>
                                                    <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, molestiae.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* qua devi fa er ciclo */}
                                {/* <div className="row">
                                    <div className='rankingPlayer p-2 mb-1 rounded col-12'>
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                                    </div>
                                    <div className='rankingPlayer p-2 mb-1 rounded col-12'>
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}