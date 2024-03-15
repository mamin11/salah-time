import Image from "next/image";

interface Prayer {name: string, adhan: string, iqama: string}

function PrayerTile({prayer} :{prayer: Prayer}) {
  return (
    <div className="h-20 pl-4 pr-8 flex gap-2 justify-between items-center rounded-2xl w-full bg-white border border-solid border-gray-300">
    <div className="flex gap-6 items-center ">
    <div className="flex items-center">
      <Image
    className="rounded-3xl"
    src="/icon-192x192.png"
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
  {name: "Fajr", adhan: "04:34", iqama: "04:54"},
  {name: "Dhuhr", adhan: "12:30", iqama: "12:45"},
  {name: "Asr", adhan: "03:44", iqama: "04:02"},
  {name: "Maghrib", adhan: "18:04", iqama: "18:02"},
  {name: "Isha", adhan: "19:30", iqama: "19:45"}
];

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-start bg-gray-200">
      <div className="h-1/4 bg-gradient-to-b from-blue-500 to-blue-700 w-full rounded-b-3xl flex justify-center items-center">
        <p className="text-white text-3xl">Welcome</p>
      </div>
      <div className="h-3/4 p-6 w-full rounded-b-3xl flex flex-col gap-4">
        
        {prayers.map((prayer) => (
          <PrayerTile prayer={prayer} />
        ))}
      </div>
    </main>
  );
}
