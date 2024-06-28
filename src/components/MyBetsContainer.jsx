import MyBetsCard from "./MyBetsCard"

export default function MyBetsContainer({ myBets, utente, notVoted, updateVote }) {
    return (
        <div>
            {myBets && myBets.length > 0 ? myBets.map((myBet) => {
                return (
                    <MyBetsCard key={myBet.id} bet={myBet} updateVote={updateVote} utente={utente} notVoted={notVoted} />

                )
            })
                :
                <div className="col-12 col-md-6">
                    <h5 className="text-center text-white">NON HAI ANCORA INSERITO NESSUNA BET</h5>
                </div>
            }
        </div>
    )
}