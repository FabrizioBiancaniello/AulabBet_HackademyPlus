export default function UserCard({ utente, calcAverageVote }) {
    return (
        <div className="userCard">
            <div className="card__border"></div>
            <div className="card__border-line"></div>
            <div className="card__inner">
                <div className="card__img">
                    <div className="img__team">
                        <img className='img-fluid' src="public\logoAulab.png" alt="Team: Ferrari logo" />
                    </div>
                    <div className="img__athlete">
                        <img className='img-fluid' src="public\Mattia_Albanese.png" alt="Charles Leclerc" />
                    </div>
                </div>
                <div className="card__text text-white">
                    <h4 className="name text-uppercase py-3 text-truncate">{utente?.name}</h4>
                    <div className="d-flex justify-content-evenly">
                        <p className="points">Bet inserite: <span className="ms-2 fs-2">{utente?.bets?.length}</span></p>
                        <p className="points">Media voti: <span className="ms-2 fs-2">{ utente?.voted && calcAverageVote(utente.voted)}</span></p>   
                    </div>
                </div>
            </div>
        </div>
    )
}