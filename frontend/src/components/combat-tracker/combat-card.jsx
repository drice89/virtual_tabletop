import React, { useState } from 'react'


const CombatantCard = (props) => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [hp, setHp] = useState(0)
  const [init, setInit] = useState(0)

  const submitCard = () => {

  }

  return(
    <div>
      <form onSubmit={() => submitCard()} >
        Name <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        Type <input type="text" value={type} onChange={(e) => setType(e.currentTarget.value) } />
        <button type="submit" value="submit" />
      </form>
    </div>
  )
}


export default CombatantCard
