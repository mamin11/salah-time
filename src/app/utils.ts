import { useState, useEffect } from "react";

const SECOND: number = 1_000;
const MINUTE: number = SECOND * 60;
const HOUR: number = MINUTE * 60;

export default function useTimer(deadline: any, interval: any = SECOND) {
    const [timespan, setTimespan] = useState(new Date(deadline).valueOf() - Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
        setTimespan((_timespan) => _timespan - interval);
        }, interval);

        return () => {
        clearInterval(intervalId);
        };
    }, [interval]);

    /* If the initial deadline value changes */
    useEffect(() => {
        setTimespan(new Date(deadline).valueOf() - Date.now());
        }, [deadline]);

        return {
        hours: Math.floor((timespan / HOUR) % 24) < 0 ? 0: Math.floor((timespan / HOUR) % 24),
        minutes: Math.floor((timespan / MINUTE) % 60) < 0 ? 0 : Math.floor((timespan / MINUTE) % 60),
        seconds: Math.floor((timespan / SECOND) % 60) < 0 ? 0 : Math.floor((timespan / SECOND) % 60)
    };
}