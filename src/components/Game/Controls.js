import React from 'react'
import Button from 'react-bootstrap/Button'

const Game = ({ gameState, setGameState }) => {

    return (
        <div id="controls" className="mx-n1">
            {(gameState === 'init') && <Button className="m-1" variant="custom" size="lg" onClick={() => {setGameState('started')}}>Start</Button>}
            {(gameState === 'started') && <Button className="m-1" variant="custom" size="lg" onClick={() => {setGameState('paused')}}>Pause</Button>}
            {(gameState === 'paused') && <Button className="m-1" variant="custom" size="lg" onClick={() => {setGameState('started')}}>Resume</Button>}
            {(gameState !== 'init') && <Button className="m-1" variant="custom" size="lg" onClick={() => {setGameState('init')}}>Restart</Button>}
        </div>
    )
}

export default Game