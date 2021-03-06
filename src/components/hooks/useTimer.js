import { useState, useEffect } from 'react';

const useTimer = () => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimer(timer + 1);
            }, 1000);
        } else if (!isActive && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timer]);

    const startTimer = () => {
        setIsActive(true);
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimer(0);
    };

    const printTimer = () => {
        const getSeconds = `0${timer % 60}`.slice(-2);
        const minutes = `${Math.floor(timer / 60)}`;
        const getMinutes = `0${minutes}`.slice(-2);

        return `${getMinutes}:${getSeconds}`;
    };

    return { timer, startTimer, pauseTimer, resetTimer, printTimer };
};

export default useTimer;
