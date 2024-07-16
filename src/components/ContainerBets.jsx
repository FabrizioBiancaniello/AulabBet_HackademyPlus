

import { useState } from 'react';
import Card from "./Card.jsx";

export default function ContainerBets({ bets, updateVote, utente, notVoted }) {
    const [currentPage, setCurrentPage] = useState(1);
    const betsPerPage = 9;

    const indexOfLastBet = currentPage * betsPerPage;
    const indexOfFirstBet = indexOfLastBet - betsPerPage;
    const currentBets = bets?.slice(indexOfFirstBet, indexOfLastBet);

    const totalPages = Math.ceil(bets?.length / betsPerPage);

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 5) * 5;
        return new Array(5).fill().map((_, idx) => start + idx + 1).filter(page => page <= totalPages);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container my-5">
            <h2 className="display-4 text-center my-5 border-bottom secondary-title">BET ATTIVE</h2>
            <div className="row">
                {currentBets?.length > 9 && <div className="col-12">
                    <div aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>&laquo;</button>
                            </li>
                            {getPaginationGroup().map(number => (
                                <li key={number} className="page-item">
                                    <button
                                        onClick={() => handlePageClick(number)}
                                        className={`page-link ${currentPage === number ? 'active' : ''}`}
                                    >
                                        {number}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>&raquo;</button>
                            </li>
                        </ul>
                    </div>
                </div>
                }
                {currentBets && currentBets.map((bet) => (
                    <Card key={bet.id} bet={bet} updateVote={updateVote} utente={utente} notVoted={notVoted} />
                ))}
            </div>
        </div>
    );
}