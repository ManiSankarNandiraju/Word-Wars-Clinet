import React, { useState, useEffect } from 'react';
import './countdown.css';
const CountDown2 = (props) => {
   const { isDescriber, childFinishRound } = props;
    const [timer, setTimer] = useState(40);
    useEffect(() => {

        const countdown = setInterval(() => {
        if (timer > 0) {
            setTimer(timer - 1); 
        } else {
            clearInterval(countdown);
            if(isDescriber) {
                childFinishRound();
            }
        }
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer, isDescriber, childFinishRound]); 


    return (
        <>
            <div className="timer-container-guesser">
                <div className="timer-bar" style={{ width: `${(timer/40)*100}%` }}>
                </div>
            </div>
            <span>{timer} seconds</span>
        </>
    );
};

export default CountDown2;
  