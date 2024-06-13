export default function ContainerBets({ bets }) {
    return (
        <>
            <div className="container">
                <h2 className="display-4 text-center my-5 border-bottom">BET ATTIVE</h2>
                <div className="row" >
                    {bets && bets.map((bet) => {
                        return (
                            <div className='col-12 col-md-6 col-xl-4 my-2' key={bet.id}>
                                <div className="bet-box">
                                    <h4 className="text-center mb-5 border-bottom">{bet.name}</h4>
                                    <p className="fw-bold">Descrizione Scommessa:</p>
                                    <p className="p-description">{bet.description}</p>
                                    <p className="text-end fw-bold">{bet.created}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}