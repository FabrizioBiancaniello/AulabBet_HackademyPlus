export default function ContainerBets({ bets, updateVote, utente, notVoted }) {
    return (
        <>
            <div className="container">
                <h2 className="display-4 text-center my-5 border-bottom">BET ATTIVE</h2>
                <div className="row" >
                    {bets && bets.map((bet) => {
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
                                    {/* && !utente.bets.includes(bet.id) */}
                                    {utente && !utente.bets?.includes(bet.id) &&  notVoted(bet.vote, utente.id) &&
                                        <div className='d-flex justify-content-between'>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 1)}>1</div>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 2)}>2</div>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 3)}>3</div>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 4)}>4</div>
                                            <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 5)}>5</div>
                                        </div>
                                    }
                                    <p className="fw-bold mt-3 mb-0 text-end">{bet.created}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}