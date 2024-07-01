// import { useState } from 'react';

// export default function AccordionBet({ setBet, bets, utente }) {
//     const [betDescription, setBetDescription] = useState("");
//     const [message, setMessage] = useState("");

//     return (
//         <div className="container-fluid">
//             <div className="row justify-content-around">
//                 {/* RIGHT COL  */}
//                 <div className='col-12 col-md-7 my-3 my-md-0'>
//                     <div className="px-3 rankingContainer rounded-3">
//                         <h3 className='text-center my-2'>CLASSIFICA</h3>
//                         <div className='row'>
//                             <div className="col-12">
//                                 <div className="row mb-2 px-2">
//                                     <div className=" d-flex align-items-center col-1 ps-3">
//                                         <i className="bi bi-trophy-fill color-yellow classifica-titles"></i>
//                                     </div>
//                                     <div className="d-flex align-items-center col-3 ps-1 color-yellow">
//                                         <h6 className='classifica-titles text-truncate'>NOME E COGNOME</h6>
//                                     </div>
//                                     <div className="d-flex align-items-center col-5 col-md-6 p-0 color-yellow">
//                                         <h6 className='classifica-titles text-truncate'>BET</h6>
//                                     </div>
//                                     <div className="d-flex align-items-center justify-content-center col-1 p-0 color-yellow">
//                                         <h6 className='classifica-titles text-truncate'>MEDIA</h6>
//                                     </div>
//                                     <div className="d-flex align-items-center justify-content-center col-2 col-md-1 p-0 color-yellow">
//                                         <h6 className='classifica-titles text-truncate'>TOT VOTI</h6>
//                                     </div>
//                                     {/* QUI SE CICLANO E PERSONE */}
//                                     {bets && bets.toSorted((a, b) => b.averageVote - a.averageVote).slice(0, 10).map((bet, i) => {
//                                         return (
//                                             // <div className='bg-secondary text-center border' key={bet.id}>{bet.averageVote} - {bet.name}</div>
//                                             <div key={bet.id} className="col-12 bg-bet rounded my-1">
//                                                 <div className="row ">
//                                                     <div className="col-1">
//                                                         <div className='rankingPlayer py-2 mb-1'>
//                                                             <p style={{ color: `rgb(${Math.round(Math.random() * (255))},${Math.round(Math.random() * (255))}, ${Math.round(Math.random() * (255))})` }} className='m-0 fw-bold'>#{i + 1}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-3">
//                                                         <div className='rankingPlayer py-2 mb-1'>
//                                                             <p className='m-0 fw-bold text-truncate'>{bet.name}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-5 col-md-6 ps-0">
//                                                         <div className='rankingPlayer py-2 mb-1'>
//                                                             <p className='m-0 text-truncate'>{bet.description}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-1 ps-0">
//                                                         <div className='rankingPlayer py-2 mb-1 text-center'>
//                                                             <p className='m-0'>{bet.averageVote}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-2 col-md-1 ps-0">
//                                                         <div className='rankingPlayer py-2 mb-1 text-center'>
//                                                             <p className='m-0'>{bet.vote.length}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                         )
//                                     })}

//                                 </div>
//                             </div>


//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }