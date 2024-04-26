import React from 'react'
import back from '../Images/backImge.jpg'
import './flip.css'



function SIngleCard({card,handleChoice,flipped,disable}) {
    const handleClick=()=>{
        if(!disable){
        handleChoice(card)
        }
    }
  return (
    <>
    <div className="cards">
          
         
        <div className={flipped?"flipped":""} >
              <img className='front' src={card.src} alt="front" />
             
              <img className='back' onClick={handleClick} src={back} alt="back" />

            </div>
            </div>
    </>
  )
}

export default SIngleCard