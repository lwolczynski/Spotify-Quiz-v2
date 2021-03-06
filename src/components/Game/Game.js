import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import useTimer from '../hooks/useTimer';
import useScore from '../hooks/useScore';
import Loader from '../Loader';
import Controls from './Controls';
import Track from './Track';
import TrackList from './TrackList';
import { getAllTracks } from '../../api/api';
import { shuffleArray } from '../../utils/utils';

const Game = () => {
    const [tracks, setTracks] = useState(null);
    const [currentTrackNo, setCurrentTrackNo] = useState(0);
    const [tracksOrder, setTracksOrder] = useState(null);
    const [gameState, setGameState] = useState('init'); // 'init', 'started', 'paused', 'finished'

    const isFirstRun = useRef(true);

    const location = useLocation();

    const { startTimer, pauseTimer, resetTimer, printTimer } = useTimer();
    const { score, scoreAddPoint, scoreAddMistake, resetScore } = useScore();

    const randomizeOrder = (numOfTracks = tracks.length) => {
        const order = [...Array(numOfTracks).keys()];
        shuffleArray(order);
        setTracksOrder(order);
    };

    useEffect(() => {
        const execute = async () => {
            const fetchedTracks = await getAllTracks(
                location.state.playlistUrl,
                location.state.playlistType
            );
            setTracks(fetchedTracks.items);
            randomizeOrder(fetchedTracks.items.length);
        };
        execute();
    }, []);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        switch (gameState) {
            case 'init':
                resetScore();
                tracks.forEach((track) => {
                    track.answered = null;
                    track.guessed = null;
                });
                randomizeOrder();
                resetTimer();
                setCurrentTrackNo(0);
                break;
            case 'started':
                startTimer();
                break;
            case 'paused':
                pauseTimer();
                break;
            case 'finished':
                pauseTimer();
                break;
            default:
                break;
        }
    }, [gameState]);

    const answer = (item) => {
        tracks[tracksOrder[currentTrackNo]].answered = true;
        if (tracks[tracksOrder[currentTrackNo]].id === item.id) {
            scoreAddPoint();
            tracks[tracksOrder[currentTrackNo]].guessed = true;
        } else {
            scoreAddMistake();
            tracks[tracksOrder[currentTrackNo]].guessed = false;
        }
        if (currentTrackNo === tracks.length - 1) {
            setGameState('finished');
        } else {
            setCurrentTrackNo(currentTrackNo + 1);
        }
    };

    return tracks === null ? (
        <Loader />
    ) : (
        <Container className="main">
            <h1>{location.state.playlistName}</h1>
            <div className="row mb-2">
                <div className="col-12 col-md-6 col-xl-5 mb-1">
                    <div className="ratio-maintainer-wrapper">
                        <div className="ratio-maintainer-inner">
                            {gameState !== 'init' ? (
                                <Track
                                    track={tracks[tracksOrder[currentTrackNo]]}
                                    paused={gameState !== 'started'}
                                />
                            ) : (
                                <Image className="game-album" src="/img/covers/no_cover_big.png" />
                            )}
                        </div>
                    </div>
                </div>
                <div id="game-status" className="col-12 col-md-6 col-xl-7">
                    {tracks.length === 0 ? (
                        <h2>This playlist seems to be empty...</h2>
                    ) : (
                        <>
                            <h2>
                                Your score: {score.correct}/{tracks.length}
                            </h2>
                            <h2>{printTimer()}</h2>
                            <Controls gameState={gameState} setGameState={setGameState} />
                        </>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TrackList
                        tracks={tracks}
                        disabled={gameState !== 'started'}
                        sendAnswer={answer}
                    />
                </div>
            </div>
        </Container>
    );
};

export default Game;
