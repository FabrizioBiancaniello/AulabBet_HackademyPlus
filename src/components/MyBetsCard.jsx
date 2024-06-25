import { useState } from "react"
// import VisibilitySensor from "react-visibility-sensor";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactVisibilitySensor from "react-visibility-sensor";



export default function MyBetsCard({ bet, updateVote, utente, notVoted }) {
    const [voteMenu, setVoteMenu] = useState(false)
    let visible = false;
    let value = 0;



    return (
        <div className='col-10 my-2 p-3'>

            {/* <div className="d-flex justify-content-between mb-3">
                    <div className="w-75">

                        <h4 className="secondary-title text-uppercase text-truncate fs-5">{bet.name}</h4>
                    </div>
                    <p className="mb-0">{bet.created}</p>
                </div> */}

            
                <div className="row text-white align-items-center justify-content-between p-3 bg-success">
                    <div className="col-8 text-truncate">
                        <h5 className="m-0">{bet.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus possimus, molestiae totam maiores vitae magnam non aliquam provident alias officiis voluptatibus, accusantium tenetur natus rem veniam a, suscipit corporis quia?</h5>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <ReactVisibilitySensor>
                            {({ isVisible }) => {
                                if (visible == false && isVisible) {
                                    value = bet.averageVote;
                                    visible = true;
                                }
                                return (
                                    <div className="circularBox me-2" style={{'width': '15%'}}>
                                        <CircularProgressbar className="w-100 h-100" value={value} maxValue={5}
                                            styles={buildStyles({
                                                // rotation: 1,
                                                strokeLinecap: 'round',

                                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                                pathTransitionDuration: 0.5,
                                                // Colors
                                                pathColor: `rgb(150, 0, 108)`,
                                                trailColor: 'rgb(236, 236, 35, 0.1)',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        />
                                        <div className="valuBox">{value}</div>
                                    </div>
                                );
                            }}
                        </ReactVisibilitySensor>
                        <div className="totVotiBox" style={{'width': '15%'}}>{bet.vote.length}</div>
                        {/* <p className="text-center mt-2">Media</p> */}
                    </div>
                </div>
            
            {/* <div>
                <p className="fw-bold text-center secondary-title">Descrizione Scommessa:</p>
                <p className="p-description">{bet.description}</p>
            </div> */}
            {/* {utente && !utente.bets?.includes(bet.id) && notVoted(bet.vote, utente.id) &&
                <p className="voteBtn m-0" onClick={() => setVoteMenu(true)}>VOTA BET</p>
            }
            <div style={{ "height": `${voteMenu ? '100%' : "0%"}`, "opacity": `${voteMenu ? '1' : "0"}` }} className='containerVotes'>
                <div className="d-flex flex-column justify-content-center p-2 position-relative h-100">
                    <i className="bi bi-x-circle fs-3 me-2 closeBtn" onClick={() => setVoteMenu(false)}></i>
                    <div className="text-center">
                        <h4 className="m-0 mb-3 fs-3 fw-bold">DIFFICOLTA' BET</h4>
                        <p className="text-uppercase">
                            Vota la bet in base alla sua difficolta'
                        </p>
                    </div>
                    <div className="d-flex justify-content-evenly ">
                        <div className='vote-box' onClick={() => { updateVote(bet.id, utente.id, 1); setVoteMenu(false) }}>1</div>
                        <div className='vote-box' onClick={() => { updateVote(bet.id, utente.id, 2); setVoteMenu(false) }}>2</div>
                        <div className='vote-box' onClick={() => { updateVote(bet.id, utente.id, 3); setVoteMenu(false) }}>3</div>
                        <div className='vote-box' onClick={() => { updateVote(bet.id, utente.id, 4); setVoteMenu(false) }}>4</div>
                        <div className='vote-box' onClick={() => { updateVote(bet.id, utente.id, 5); setVoteMenu(false) }}>5</div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}