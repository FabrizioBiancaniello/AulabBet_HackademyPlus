import NewBet from './NewBet'
import MyBetsCard from './MyBetsCard'

export default function MyProfileContainer({ utente, setBet, myBets }) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-4">
                    <NewBet utente={utente} setBet={setBet} />
                </div>
                <div className="col-12 col-md-4">

                </div>
                <div className="col-12 col-md-4">
                    {myBets && myBets.length > 0 ? myBets.map((myBet) => {
                        return (
                            <MyBetsCard key={myBet.id} bet={myBet} />

                        )
                    })
                        :
                        <div className="col-12 col-md-6">
                            <h5 className="text-center text-white">NON HAI ANCORA INSERITO NESSUNA BET</h5>
                        </div>
                    }
                    {/* <MyBetsCard bet={bet} /> */}
                    {/* <MyBetsContainer myBets={myBets} utente={utente} updateVote={updateVote} notVoted={notVoted} /> */}
                </div>
            </div>
        </div>
    )
}