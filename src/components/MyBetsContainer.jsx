import Card from "./Card"

export default function MyBetsContainer({myBets, utente, notVoted, updateVote}){
    return(
        <div className="container py-5">
            <h2 className="display-2 text-center my-5 border-bottom secondary-title">LE MIE BET</h2>
            <div className="row justify-content-center" >
                {myBets && myBets.length > 0 ? myBets.map((myBet) => {
                    return (
                        <Card key={myBet.id} bet={myBet} updateVote={updateVote} utente={utente} notVoted={notVoted}/> 
                    )
                })
                :
                <div className="col-12 col-md-6">
                    <h5 className="text-center text-white">NON HAI ANCORA INSERITO NESSUNA BET</h5>
                </div>
            }
            </div>
        </div>
    )
}