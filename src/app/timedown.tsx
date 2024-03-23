'use client';
import { useState, useEffect } from "react";
import { Prayer } from "./interfaces";
import Timer from "./timer";

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
    let [today, setToday] = useState<Date>(new Date());
    let [todayString, setTodayString] = useState<string>(today.toISOString().substr(0, 10));
    let [nextDay, setNextDay] = useState<Date>(new Date());
    let [nextDayStr, setNextDayStr] = useState<string>(nextDay.toISOString().substr(0, 10));
    let [nextPrayerTime, setNextPrayerTime] = useState<Date>(new Date(`${todayString}T${'23:59:59'}`));
    let [todayPrayersOver, setTodayPrayersOver] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            // get prayers
            const response = await fetch('/api?day='+today.toISOString().substr(0, 10));   
            let jsonData = await response.json();

            // if isha has passed current time, request next days data
            const isha = jsonData.data?.find((p: Prayer) => p.name === 'Isha');
            if(isha && (new Date(`${todayString}T${isha.iqama}`).valueOf() < today.valueOf())) {
                // todayPrayersOver = true;
                setTodayPrayersOver(true);
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

        setToday(new Date());
        setTodayString(today.toISOString().substr(0, 10));
        // set next day to nextDay + 1
        nextDay.setDate(new Date().getDate() + 1);
        setNextDay(nextDay);
        setNextDayStr(nextDay.toISOString().substr(0, 10));

        fetchData();
    }, []);

    return <Timer nextPrayer={nextPrayerTime} />;
}