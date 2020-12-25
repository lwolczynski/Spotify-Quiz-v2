import React from 'react'
import Button from 'react-bootstrap/Button'

const Game = ({ gameState, setGameState }) => {

    return (
        <>
            {(gameState === 'init') && <Button variant="custom" onClick={() => {setGameState('started')}}>Start</Button>}
            {(gameState === 'started') && <Button variant="custom" onClick={() => {setGameState('paused')}}>Pause</Button>}
            {(gameState === 'paused') && <Button variant="custom" onClick={() => {setGameState('started')}}>Resume</Button>}
            {(gameState !== 'init') && <Button variant="custom" onClick={() => {setGameState('init')}}>Restart</Button>}
        </>
    )
}

export default Game