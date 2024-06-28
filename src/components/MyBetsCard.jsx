import { useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactVisibilitySensor from "react-visibility-sensor";



export default function MyBetsCard({ bet, updateVote, utente, notVoted }) {
    const [voteMenu, setVoteMenu] = useState(false)
    let visible = false;
    let value = 0;



    return (
        <div className='col-10 my-2 p-3'>
            
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

        </div>
    )
}