import { useState } from 'react';

const useScore = () => {
    const [score, setScore] = useState({ correct: 0, wrong: 0 });

    const scoreAddPoint = () => {
        setScore((prevState) => ({
            ...prevState,
            correct: score.correct + 1,
        }));
    };

    const scoreAddMistake = () => {
        setScore((prevState) => ({
            ...prevState,
            wrong: score.wrong + 1,
        }));
    };

    const resetScore = () => {
        setScore({ correct: 0, wrong: 0 });
    };

    return { score, scoreAddPoint, scoreAddMistake, resetScore };
};

export default useScore;
