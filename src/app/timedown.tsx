'use client';
import { useState, useEffect, useMemo, useCallback } from "react";
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
    const [today, setToday] = useState<Date>(new Date());
    const todayString = useMemo(() => today.toISOString().substr(0, 10), [today]);
    const [nextDay, setNextDay] = useState<Date>(new Date());
    const nextDayStr = useMemo(() => nextDay.toISOString().substr(0, 10), [nextDay]);
    const [nextPrayerTime, setNextPrayerTime] = useState<Date>(new Date(`${todayString}T${'23:59:59'}`));
    const [todayPrayersOver, setTodayPrayersOver] = useState(false);
    const [prayers, setPrayers] = useState<Prayer[]>([]);

    const fetchPrayers = useCallback(async (todayString:string) => {
        try {
            const response = await fetch('/api?day=' + todayString);
            const jsonData = await response.json();
            setPrayers(jsonData.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchPrayers(todayString);
        const timer = setInterval(() => {
            fetchPrayers(todayString);
        }, 24 * 60 * 60 * 1000); // Fetch prayers every 24 hours
    
        return () => clearInterval(timer); // Clean up on component unmount
    }, [fetchPrayers]);

    useEffect(() => {
        if (prayers.length > 0) {
            const isha = prayers.find((p: Prayer) => p.name === 'Isha');
            if (isha && (new Date(`${todayString}T${isha.iqama}`).valueOf() < Date.now())) {
                setTodayPrayersOver(true);
                fetchPrayers(nextDayStr);
            }
    
            if (todayPrayersOver) {
                const nextPr = getNextPrayer(prayers, nextDayStr, today);
                setNextPrayerTime(nextPr);
            } else {
                const nextPr = getNextPrayer(prayers, todayString, today);
                setNextPrayerTime(nextPr);
            }
        }
    }, [prayers, today, todayString, nextDay, nextDayStr, todayPrayersOver, fetchPrayers]);

    return <Timer nextPrayer={nextPrayerTime} />;
}