import React, { useEffect, useState } from 'react'
import '../App.css'
import tom from '../Images/apple.jpg'
import jerry from '../Images/banana.jpg'
import tyke from '../Images/cherry.jpg'
import topsy from '../Images/grape.jpg'
import tuffy from '../Images/kiwi.jpg'
import light from '../Images/orange.jpg'
import spike from '../Images/papaya.jpg'
import quack from '../Images/straw.jpg'
import butch from '../Images/water.jpg'
import SIngleCard from './SIngleCard'


function Flip() {
    const cardImages=[
        {'src':tom },{'src':jerry, matched:false},{'src':topsy, matched:false},{'src':quack, matched:false},{'src':tuffy, matched:false},{'src':butch, matched:false},{'src':tyke, matched:false},{'src':spike, matched:false},{'src':light, matched:false}  
    ]
        const[ cards,setCards]=useState([])
        const[ turn,setTurn]=useState(0)
        const[ choiceOne,setChoiceOne]=useState(null)
        const[ choiceTwo,setchoiceTwo]=useState(null)
        const[ disable,setDisable]=useState(false)
        const [gameWon, setGameWon] = useState(false)
      
       console.log(cardImages);
        //suffle Cards
        const shuffleCards=()=>{
          const shuffleCard=[...cardImages,...cardImages]
          .sort(()=>Math.random()-0.5).map((card)=>({...card,id:Math.random()}))
          setChoiceOne(null)
          setchoiceTwo(null)
          setCards(shuffleCard)
          setTurn(0)
          setGameWon(false);
        }



//handle choice
    const handleChoice=(card)=>{
            choiceOne? setchoiceTwo(card):setChoiceOne(card)
    }
    // compare 2 selected cards
    useEffect(()=>{
        if (choiceOne&& choiceTwo) {
            setDisable(true)
            if(choiceOne.src=== choiceTwo.src){
                setCards(prevCard=>{
                    return prevCard.map(card=>{
                        if(card.src=== choiceOne.src){
                            return{...card,matched:true}
                        }else{
                            return card
                        }
                    })
                })
                resetTurns()
            }
         else {
            setTimeout(()=>resetTurns(),1500)
        }}
    },[ choiceOne,choiceTwo])

    useEffect(() => {
        if (cards.length > 0 && cards.every((card) => card.matched)) {
          setGameWon(true);
        }
      }, [cards]);


    // reset cards and increase turns
    const resetTurns=()=>{
        setChoiceOne(null)
        setchoiceTwo(null)
        setTurn(newTurns=>newTurns+1)
        setDisable(false)
    }
console.log(cards);
useEffect(()=>{
    shuffleCards()
},[])
        return (
    <>
    <div className='main'>

        <div className="h1">MEMORY GAME</div>
        <button onClick={shuffleCards}>New Game</button>
       

      <div className=" card-grid">
        {cards.map(card=>(         
            <SIngleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card===choiceOne || card===choiceTwo || card.matched} disable={disable}/>
        ))}
      </div>
      <p>Turns:{turn}</p>
      {gameWon && <p>Congratulations! You won the game! 🎉</p>} 
      </div>

    </>
  )
}

export default Flip