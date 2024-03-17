'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import {Prayer} from "./interfaces";

function PrayerTile({prayer} :{prayer: Prayer}) {
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
    const today = new Date();
    const [prayers, setPrayers] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api?day='+today.toISOString().substr(0, 10));   
            const jsonData = await response.json();
            
            setPrayers(jsonData.data)
        };

        fetchData();
    }, []);
    
    return (
        <div className="h-3/4 p-6 w-full rounded-b-3xl flex flex-col gap-4 items-center">
            <p className="text-gray-600 text-center text-md font-semibold p-2">{today.toDateString()}</p>
            
            {(prayers).map((prayer, index) => (
            <PrayerTile key={index} prayer={prayer} />
            ))}

            {prayers.length <= 0 ? <span className="my-auto items-center justify-center">Sorry no data</span> : <span></span>}
        </div>
    );
}