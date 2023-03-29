import { useEffect, useState, useRef } from "react"

import Ball from "./Interfaces/BallInterface"

export default function BallList() {
  const [balls, setBalls] = useState<Ball[]>([])
  const [prevBalls, setPrevBalls] = useState<Ball[]>([])

  const prevButtonRef = useRef<HTMLButtonElement>(null)
  const restoreButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
      prevButtonRef.current!.disabled  = balls.length === 0 
  }, [balls])

  useEffect(() => {
    restoreButtonRef.current!.disabled  = prevBalls.length === 0 
  }, [prevBalls])

  function handleAddBall({clientX, clientY} : React.MouseEvent<HTMLDivElement>) {
    const id = Math.floor(Math.random() * 1000)
    const newBall = {
      id,
      clientX,
      clientY 
    }

    setBalls([...balls, newBall])
  }

  function handleRemoveBall()  {
    const tempBalls: Ball[] = [...balls]
    const lastBall: Ball = tempBalls.pop() as Ball

    

    setPrevBalls([...prevBalls ,lastBall])
    setBalls([...tempBalls])

  }

  function handleRestoreBall() {
    const tempBalls: Ball[] = [...balls]
    const tempPrevBalls : Ball[] = [...prevBalls]
    const lastPrevBalls : Ball = tempPrevBalls.pop() as Ball

    tempBalls.push(lastPrevBalls)

    setBalls([...tempBalls])
    setPrevBalls([...tempPrevBalls])

  }
  

  return ( 
    <div className="container">
        <div className="buttons">
          <button onClick={handleRemoveBall} ref={prevButtonRef}>Remover ultima bola adicionada</button>
          <button onClick={handleRestoreBall} ref={restoreButtonRef}>restaurar bola removida</button>
        </div>
        
        <div className='ball-container' onClick={(event) => handleAddBall(event)}>
      
          {balls.map((ball) => {
            return (
              <div 
              key={ball.id}
              className="ball"
              style={{
                top: ball.clientY + 'px', 
                left: ball.clientX + 'px',
                }}
              ></div>
            )
          })}
        </div>    
    </div>
   
    
  )
}