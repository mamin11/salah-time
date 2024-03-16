'use client';
import {PrayerList} from "./interfaces";
import useTimer from "./utils";


export default function TimeDown({prayers} :PrayerList) {
    // Get current time
    const now = new Date();
    const todayString = now.toISOString().substr(0, 10);

    const sortedPrayers = prayers.slice().sort((a, b) => {
        const timeA = new Date(`${todayString}T${a.iqama}`);
        const timeB = new Date(`${todayString}T${b.iqama}`);
        return timeA.getTime() - timeB.getTime();
    });

    // Find the next prayer
    let nextPrayer = null;
    for (const prayer of sortedPrayers) {
        let adhanTime = new Date(`${todayString}T${prayer.iqama}`);
        if (adhanTime.valueOf() > now.valueOf()) {
            nextPrayer = prayer.iqama;
            break;
        }
    }

    const nextPrayerTime = new Date(`${todayString}T${nextPrayer}`);
    const { hours, minutes, seconds } = useTimer(nextPrayerTime);

    return <span className="text-white text-4xl">{`${hours}`+':'+`${minutes}`+':'+`${seconds}`}</span>;
}