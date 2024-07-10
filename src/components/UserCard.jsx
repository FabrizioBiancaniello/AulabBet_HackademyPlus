import Newbet from "./NewBet"
import { useState } from "react";

export default function UserCard({ utente, calcAverageVote, setBet }) {
    const [message, setMessage] = useState("");

    return (
        <>
            <div className="userCard">
                <div className="card__border"></div>
                <div className="card__border-line"></div>
                <div className="card__inner">
                    <div className="card__img">
                        <div className="img__team">
                            <img className='img-fluid' src="/logoAulab.png" alt="Team: Ferrari logo" />
                        </div>
                        <div className="img__athlete">
                            <img className='img-fluid' src={utente?.img ?? "/default.png"} alt="Charles Leclerc" />
                        </div>
                    </div>
                    <div className="card__text text-white">
                        <h4 className="name text-uppercase py-3 text-truncate">{utente?.name}</h4>
                        <div className="d-flex flex-column align-items-center">
                            <p className="points">Bet inserite: <span className="ms-2 fs-2 text-a">{utente?.bets?.length}</span>/3</p>
                            <p className="points">Media voti: <span className="ms-2 fs-2 text-a">{utente?.voted && calcAverageVote(utente.voted)}</span></p>
                        </div>
                    </div>
                </div>

            </div>
            {
                utente?.bets?.length < 3 &&
                <div className="d-flex justify-content-center">
                    <button className="my-5 btn-custom fs-5 w-50" data-bs-toggle="modal" data-bs-target="#newBet">NUOVA BET</button>
                </div>
            }


            {/* Modal */}
            <Newbet utente={utente} setBet={setBet} setMessage={setMessage} />
            {message &&
                <div className={`alert-box alert text-center fw-bold ${message.type == "error" ? "alert-danger" : "alert-success"}`} role="alert">
                    {message.body}
                </div>
            }
        </>
    )
}