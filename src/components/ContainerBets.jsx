import { useState } from "react"

export default function ContainerBets({ bets, updateVote, utente, notVoted }) {
    const [voteMenu, setVoteMenu] = useState(false) 


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
                                            <p className="voteBtn m-0" onClick={()=> setVoteMenu(true)}>VOTA BET</p>
                                        </div>
                                    }

                                    {/* <p className='text-center fw-bold'>VOTA</p>
                                    {utente && notVoted(bet.vote, utente.id) &&
                                    <p className="fw-bold">Descrizione Scommessa:</p>
                                    <p className="p-description">{bet.description}</p>
                                    <p className='text-center fw-bold'>VOTA</p>
                                    {/* && !utente.bets.includes(bet.id) */}
                                    {utente && !utente.bets?.includes(bet.id) && notVoted(bet.vote, utente.id) &&
                                        <div style={{"height" : `${voteMenu ? '100%' : "0%"}`, "opacity" : `${voteMenu ? '1' : "0"}`}} className='containerVotes'>
                                            <div className="d-flex flex-column justify-content-center p-2 position-relative h-100">
                                                <i className="bi bi-x-circle fs-3 me-2 closeBtn" onClick={()=>setVoteMenu(false)}></i>
                                                <div className="text-center">
                                                    <h4 className="m-0 mb-3 fs-3 fw-bold">DIFFICOLTA' BET</h4>
                                                    <p className="text-uppercase">
                                                        Vota la bet in base alla sua difficolta'
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-evenly ">
                                                    <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 1)}>1</div>
                                                    <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 2)}>2</div>
                                                    <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 3)}>3</div>
                                                    <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 4)}>4</div>
                                                    <div className='vote-box' onClick={() => updateVote(bet.id, utente.id, 5)}>5</div>
                                                </div>
                                            </div>


                                        </div>
                                    }

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}