import { useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactVisibilitySensor from "react-visibility-sensor";

export default function MyBetsCard({bet}) {
    const [voteMenu, setVoteMenu] = useState(false)
    let visible = false;
    let value = 0;

    return (
            <div className="row text-white align-items-center justify-content-between p-3 rounded-3 myBetContainer mb-4 position-relative">
                    <span className="px-2 rounded-4 bg-yellow text-black card-date">{bet.created}</span>
                <div className="col-12 d-flex justify-content-center mb-3">
                    <div className="d-flex align-items-center">
                        <p className="m-0 pe-3">Media Voti: </p>
                    <ReactVisibilitySensor>
                        {({ isVisible }) => {
                            if (visible == false && isVisible) {
                                value = bet.averageVote;
                                visible = true;
                            }
                            return (
                                <div className="circularBox me-2" style={{ 'width': '50px' }}>
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
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="totVotiBox" style={{ 'width': '50px' }}>{bet.vote.length}</div>
                        <p className="m-0 p-3">Totale Voti </p>
                    </div>
                    {/* <p className="text-center mt-2">Media</p> */}
                </div>
                <div className="col-12 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="m-0 mb-2 text-secondary">Descrizione scommessa:</h6>
                    </div>
                    <div className="overflow-y-auto pb-3" style={{height : '80px'}}>
                        <p className="m-0 fw-light ">{bet.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta hic dolor vel saepe facere nesciunt eaque quidem, nobis odio quod repellat praesentium ut nostrum cumque fuga neque quasi, animi fugit!</p>

                    </div>
                </div>
            </div>
    )
}