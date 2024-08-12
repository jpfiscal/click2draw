import React from "react"

const Card = ({img})=>{
    return(
        <div className="Card">
            <img src={img} alt="drawn card image"></img>
        </div>
    )
}

export default Card;