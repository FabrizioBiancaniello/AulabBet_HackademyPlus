import MyBetsCard from './MyBetsCard'
import UserCard from './UserCard'

export default function MyProfileContainer({ utente, setBet, myBets, calcAverageVote }) {
    return (
        <div className="container py-5">
            {/* <div className='row justify-content-center pb-5'>
                <div className="col-12 col-lg-8 py-3 ">
                    <h2 className="display-4 text-center secondary-title">IL MIO PROFILO</h2>
                </div>
            </div> */}
            {
                utente ? <div className="row justify-content-around">
                    <div className="col-12 col-md-4">
                        <UserCard utente={utente} calcAverageVote={calcAverageVote} setBet={setBet} />
                    </div>

                    <div className="col-12 col-md-5 p-3">
                        {myBets && myBets.length > 0 ? myBets.reverse().map((myBet) => {
                            return (
                                <MyBetsCard key={myBet.id} bet={myBet} />
                            )
                        })
                            :
                            <div className="col-12 col-md-6 h-100 w-100 d-flex justify-content-center align-items-center bg-section-non">
                                <h2 className="text-center text-white">NON HAI ANCORA INSERITO UNA BET</h2>
                            </div>
                        }
                    </div>
                </div>
                    :
                    <div className='row'>
                        <div className="col-12 px-3">
                            <div className='bg-section-non d-flex justify-content-center align-items-center'>
                                <h2 className='text-white text-center'>PER INSERIRE UNA BET BISOGNA POSSEDERE UN ACCOUNT, UTILIZZA LA SEZIONE APPOSITA IN ALTO A DESTRA PER REGISTRARTI O EFFETTUARE IL LOGIN</h2>
                            </div>
                        </div>
                    </div>
            }
        </div>

    )
}