import { useState } from "react"
import  Card from "./Card.jsx" 
import { update } from "firebase/database"

export default function ContainerBets({ bets, updateVote, utente, notVoted }) {
    


    return (
            <div className="container py-5">
                <h2 className="display-2 text-center my-5 border-bottom secondary-title">BET ATTIVE</h2>
                <div className="row" >
                    {bets && bets.map((bet) => {
                        return (
                            <Card key={bet.id} bet={bet} updateVote={updateVote} utente={utente} notVoted={notVoted}/>
                        )
                    })}
                </div>
            </div>
    )
}