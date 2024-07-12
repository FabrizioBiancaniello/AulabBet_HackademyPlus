import MyBetsCard from './MyBetsCard'
import UserCard from './UserCard'

export default function MyProfileContainer({ utente, setBet, myBets, calcAverageVote }) {
    return (
        <div className="container" >
            {
                utente ? <div className="row justify-content-around align-items-center" style={{"minHeight": "80vh"}}>
                    <div className="col-12 col-md-6">
                        <UserCard utente={utente} calcAverageVote={calcAverageVote} setBet={setBet} />
                    </div>

                    <div className="col-10 col-md-5 my-5 my-md-0">
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