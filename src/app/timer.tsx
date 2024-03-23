import React from 'react';
import useTimer from './utils';

interface TimerProps {
    nextPrayer: Date;
}

const Timer: React.FC<TimerProps> = ({ nextPrayer }) => {
    const { hours, minutes, seconds } = useTimer(nextPrayer);
    return (
        <>
            {hours == 0 && minutes == 0 && seconds == 0 ?
                <span className="text-white text-4xl">...</span>
                :
                <span className="text-white text-4xl">{`${hours}` + ':' + `${minutes}` + ':' + `${seconds}`}</span>}
        </>
    );
};

export default Timer;