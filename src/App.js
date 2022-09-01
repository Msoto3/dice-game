import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [status, setStatus] = React.useState(false)
    const [Count,setCount] = React.useState(0)
    
    React.useEffect(() => {
        const gameOver = dice.filter(die => die.isHeld && die.value===dice[0].value)
        if(gameOver.length===dice.length){
          setStatus(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        setCount(prevCount => prevCount+1)
        if(!status) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setCount(0)
            setStatus(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {<h1 className="title">{status? "Game Over":"Dice Game"}</h1>}
            {!status &&<p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>}
            {status && <p className="instructions">Number of rolls: {Count}</p>}
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {status ? "New Game" : "Roll"}
            </button>
        </main>
    )
}