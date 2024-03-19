'use client';
import { useState, useEffect } from "react";
import useTimer from "./utils";
import { Prayer } from "./interfaces";

function getNextPrayer(prayers: Prayer[], todayString: string, today: Date) {
    const sortedPrayers = prayers.slice().sort((a, b) => {
        const timeA = new Date(`${todayString}T${a.iqama}`);
        const timeB = new Date(`${todayString}T${b.iqama}`);
        return timeA.getTime() - timeB.getTime();
    });

    // Find the next prayer
    let nextPrayer = null;
    for (const prayer of sortedPrayers) {
        let adhanTime = new Date(`${todayString}T${prayer.iqama}`);
        if (adhanTime.valueOf() > today.valueOf()) {
            nextPrayer = prayer.iqama;
            break;
        }
    }

    return new Date(`${todayString}T${nextPrayer}`);
}

export default function TimeDown() {
    let today = new Date();
    let todayString = today.toISOString().substr(0, 10);
    let nextDay = new Date();
    nextDay.setDate(new Date().getDate() + 1);
    let nextDayStr = nextDay.toISOString().substr(0,10);
    let [nextPrayerTime, setNextPrayerTime] = useState<Date>(new Date(`${todayString}T${'23:59:59'}`));
    let timerPeriod = {hours: 0, minutes: 0, seconds: 0};
    let todayPrayersOver = false;
    
    useEffect(() => {
        const fetchData = async () => {
            // get prayers
            const response = await fetch('/api?day='+today.toISOString().substr(0, 10));   
            let jsonData = await response.json();

            // if isha has passed current time, request next days data
            const isha = jsonData.data?.find((p: Prayer) => p.name === 'Isha');
            if(isha && (new Date(`${todayString}T${isha.iqama}`).valueOf() < today.valueOf())) {
                todayPrayersOver = true;
                const newResponse = await fetch('/api?day='+nextDay.toISOString().substr(0, 10));
                jsonData = await newResponse.json();
            }
            
            if(todayPrayersOver) {
                const nextPr = getNextPrayer(jsonData.data, nextDayStr, today);
                setNextPrayerTime(nextPr);
            } else {
                const nextPr = getNextPrayer(jsonData.data, todayString, today);
                setNextPrayerTime(nextPr);
            }
        };

        fetchData();
    }, []);

    // const { hours, minutes, seconds } = useTimer(nextPrayerTime);
    timerPeriod = useTimer(nextPrayerTime);

    return <>
    {timerPeriod.hours != 0 && timerPeriod.minutes != 0 && timerPeriod.seconds != 0 ? 
    <span className="text-white text-4xl">{`${timerPeriod.hours}`+':'+`${timerPeriod.minutes}`+':'+`${timerPeriod.seconds}`}</span>
    : 
    <span className="text-white text-4xl">...</span>}
    </>
}