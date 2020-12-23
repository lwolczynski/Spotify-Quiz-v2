import React from 'react'
import Button from 'react-bootstrap/Button'

const Game = ({ gameState, setGameState }) => {

    return (
        <>
            {(gameState === 'init') && <Button onClick={() => {setGameState('started')}}>Start</Button>}
            {(gameState === 'started') && <Button onClick={() => {setGameState('paused')}}>Pause</Button>}
            {(gameState === 'paused') && <Button onClick={() => {setGameState('started')}}>Resume</Button>}
            {(gameState !== 'init') && <Button onClick={() => {setGameState('init')}}>Restart</Button>}
        </>
    )
}

export default Game