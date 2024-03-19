'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { Prayer } from "./interfaces";

function PrayerTile({ prayer }: { prayer: Prayer }) {
    return (
        <div className="h-20 pl-4 pr-8 flex gap-2 justify-between items-center rounded-2xl w-full bg-white border border-solid border-gray-300">
            <div className="flex gap-4 items-center ">
                <div className="flex items-center">
                    <Image
                        className="rounded-3xl"
                        src={prayer.icon}
                        alt="Next.js Logo"
                        width={50}
                        height={50}
                        priority
                    />
                </div>
                <div>{prayer.name}</div>
            </div>
            <div className="flex flex-col items-center font-light text-sm">
                <p>Adhan: {prayer.adhan}</p>
                <p>Iqama: {prayer.iqama}</p>
            </div>
        </div>
    );
}

export default function Prayers() {
    const [today, setToday] = useState<Date>(new Date());
    const [prayers, setPrayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api?day=' + today.toISOString().substr(0, 10));
            const jsonData = await response.json();

            setPrayers(jsonData.data)
        };

        fetchData();
    }, [today]);

    const loadNextDay = () => {
        const newDate = new Date(today);
        newDate.setDate(newDate.getDate() + 1);
        setToday(newDate);
    }

    const loadPrevDay = () => {
        const newDate = new Date(today);
        newDate.setDate(newDate.getDate() - 1);
        setToday(newDate);

    }

    return (
        <div className="h-3/4 p-6 w-full rounded-b-3xl flex flex-col gap-4 items-center">
            <div className="flex w-full justify-between">
                <button onClick={loadPrevDay} type="button" className="text-white rotate-180 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    <span className="sr-only">Icon description</span>
                </button>
                <p className="text-gray-600 text-center text-md font-semibold p-2">{today.toDateString()}</p>
                <button onClick={loadNextDay} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    <span className="sr-only">Icon description</span>
                </button>
            </div>

            {prayers?.length > 0 ? (
                prayers.map((prayer, index) => (
                    <PrayerTile key={index} prayer={prayer} />
                ))
            ) : (
                <p>No data available</p>
            )}

        </div>
    );
}