import NewBet from './NewBet'
import MyBetsCard from './MyBetsCard'
import UserCard from './UserCard'

export default function MyProfileContainer({ utente, setBet, myBets, calcAverageVote }) {
    return (
        <div className="container-fluid py-5">
            <div className="row justify-content-evenly">
                {
                utente && <div className="col-12 col-md-4">
                    <UserCard utente={utente} calcAverageVote={calcAverageVote} setBet={setBet} />
                </div>
                }
                <div className="col-12 col-md-5 p-3">
                    {myBets && myBets.length > 0 ? myBets.reverse().map((myBet) => {
                        return (
                            <MyBetsCard key={myBet.id} bet={myBet}  />

                        )
                    })
                        :
                        <div className="col-12 col-md-6 h-100 w-100 d-flex justify-content-center align-items-center bg-section-non">
                            <h2 className="text-center text-white">NON HAI ANCORA INSERITO UNA BET</h2>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}