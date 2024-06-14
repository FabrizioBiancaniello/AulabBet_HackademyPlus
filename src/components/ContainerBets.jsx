export default function ContainerBets({ bets, updateVote, utente, notVoted }) {
    return (
        <>
            <div className="container py-5">
                <h2 className="display-2 text-center my-5 border-bottom secondary-title">BET ATTIVE</h2>
                <div className="row" >
                    {bets && bets.map((bet) => {
                        return (
                            <div className='col-12 col-md-6 col-xl-4 my-2' key={bet.id}>
                                <div className="bet-box">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="w-75">

                                            <h4 className="secondary-title text-uppercase text-truncate fs-5">{bet.name}</h4>
                                        </div>
                                        <p className="mb-0">{bet.created}</p>
                                    </div>
                                    <div>
                                        <p className="fw-bold">Descrizione Scommessa:</p>
                                        <p className="p-description">{bet.description}</p>
                                    </div>
                                    <div className="d-flex justify-content-between py-3">
                                        <p className="fs-5">Media voto: <span className="trasparency fw-bold ms-2 fs-4">{bet.averageVote}</span></p>
                                        <p className="fs-5">TOT Voti: <span className="trasparency fw-bold ms-2 fs-4">{bet.vote.length}</span></p>
                                    </div>
                                    
                                        {utente && notVoted(bet.vote, utente.id) &&
                                            <div className=" d-flex justify-content-center">
                                                <a href="" className="voteBtn">VOTA BET</a>
                                            </div>
                                        }
                                    
                                    {/* <p className='text-center fw-bold'>VOTA</p>
                                    {utente && notVoted(bet.vote, utente.id) &&
                                        <div className='d-flex justify-content-between'>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 1)}>1</div>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 2)}>2</div>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 3)}>3</div>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 4)}>4</div>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 5)}>5</div>
                                        </div>
                                    } */}

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}