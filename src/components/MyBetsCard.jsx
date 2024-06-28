import { useState } from "react"
// import VisibilitySensor from "react-visibility-sensor";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactVisibilitySensor from "react-visibility-sensor";

export default function MyBetsCard({bet}) {
    const [voteMenu, setVoteMenu] = useState(false)
    let visible = false;
    let value = 0;

    return (
            <div className="row text-white align-items-center justify-content-between p-3 rounded-3 myBetContainer my-2">
                <div className="col-12 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="m-0">Descrizione scommessa:</h5>
                        <span className="px-2 rounded-4 bg-yellow text-black">{bet.created}</span>
                    </div>
                    <div className="overflow-y-auto py-3" style={{height : '80px'}}>
                        <p className="m-0 fw-light ">{bet.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta hic dolor vel saepe facere nesciunt eaque quidem, nobis odio quod repellat praesentium ut nostrum cumque fuga neque quasi, animi fugit!</p>

                    </div>
                </div>
                <div className="col-7 d-flex justify-content-end ms-auto">
                    <ReactVisibilitySensor>
                        {({ isVisible }) => {
                            if (visible == false && isVisible) {
                                value = bet.averageVote;
                                visible = true;
                            }
                            return (
                                <div className="circularBox me-2" style={{ 'width': '15%' }}>
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
                    <div className="totVotiBox" style={{ 'width': '15%' }}>{bet.vote.length}</div>
                    {/* <p className="text-center mt-2">Media</p> */}
                </div>
            </div>
    )
}