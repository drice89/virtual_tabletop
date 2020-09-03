import React, { useState } from 'react'
import CombatantCard from "./combat-card"

const CombatTracker = (props) => {
  const [cards, setCards] = useState([{id: 1}])
  const [count, setCount] = useState(1)

  const newCard = () => {
    let increaseCount = count + 1
    setCount(increaseCount)
    let cardsCopy = cards.slice()
    cardsCopy.push({id: increaseCount})
    setCards(cardsCopy)
  }

  return (
    <div>
      <div>
        {
          cards.map(card => {
            return (
            <div key={card.id} >
              <CombatantCard id={card.id}/>
            </div>
            )
            })
        }
      </div>
      <div>
        <i className="ra ra-health" onClick={() => newCard()}/>
      </div>
    </div>
  );
}

export default CombatTracker
