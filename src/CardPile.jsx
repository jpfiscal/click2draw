import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import axios from 'axios';
import "./CardPile.css"

const BASE_URL = "https://deckofcardsapi.com/api/deck/"
//create new deck


const CardPile = () =>{
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);
    const [remaining, setRemaining] = useState(52);
    const shuffleBtn = useRef();

    function draw(){
        setRemaining(remaining - 1);
        console.log(`REMAINING:${remaining}`);
    }

    async function shuffle(){
        //disable the shuffle button
        shuffleBtn.current.style.disabled = true;

        setRemaining(52);
        await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);

        //re-enable the shuffle button
        shuffleBtn.current.style.disabled = false;
    }

    useEffect(function createDeck(){
        async function createNewDeck(){
            const newDeck = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
            setDeck(newDeck.data);
        }
        createNewDeck();
    }, [])
    useEffect(function drawNewCard(){
        if (!deck || remaining >= 52) return; //Don't attempt to draw if deck is not ready yet
        async function drawCard(){
            const newCard = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);
            console.log(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);
            setCard(newCard.data.cards[0]);
        }
        drawCard();
    },[remaining])

    return(
        <div>
            {(remaining > 0) ? <button id="drawBtn" onClick={draw}>Gimme a Card</button> : <h2>Error: no cards remaining!</h2>}
            {(remaining > 0 && remaining < 52 && card) ? <Card img={ card.image }/> : <></>}
            <button id="shuffleBtn" onClick = {shuffle} ref={shuffleBtn}>Shuffle</button>
        </div>
    )
}

export default CardPile;