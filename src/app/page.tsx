import Image from "next/image";
import TimeDown from "./timedown";
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

const prayers :Prayer[] = [
  {name: "Fajr", adhan: "04:32", iqama: "04:52", icon: "/sunrise.svg"},
  {name: "Dhuhr", adhan: "12:30", iqama: "12:45", icon: "/dhuhr.svg"},
  {name: "Asr", adhan: "15:22", iqama: "15:45", icon: "/dhuhr.svg"},
  {name: "Maghrib", adhan: "18:09", iqama: "18:09", icon: "/maghrib.svg"},
  {name: "Isha", adhan: "19:30", iqama: "19:45", icon: "/isha.svg"}
];

export default function Home() {

  return (
    <main className="flex flex-col h-screen items-start bg-gray-200">
      <div className="h-1/4 bg-gradient-to-b from-blue-500 to-blue-700 w-full rounded-b-3xl flex flex-col justify-center items-center">
        <TimeDown prayers={prayers} />
        <p className="text-white text-sm p-2">time to next prayer</p>
      </div>
      <div className="h-3/4 p-6 w-full rounded-b-3xl flex flex-col gap-4">
        <p className="text-gray-600 text-center text-md font-semibold p-2">{new Date().toDateString()}</p>
        
        {prayers.map((prayer) => (
          <PrayerTile prayer={prayer} />
        ))}
      </div>
    </main>
  );
}
