import Image from "next/image";

function PrayerTile() {
  return (
    <div className="h-24 pl-4 pr-8 flex gap-2 justify-between items-center rounded-2xl w-full bg-white border border-solid border-gray-300">
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
    <div>prayer name</div>
    </div>
    <div className="flex flex-col items-center font-light text-sm">
      <p>Adhan: 17:00</p>
      <p>Iqama: 17:00</p>
    </div>
  </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-start bg-gray-200">
      <div className="h-2/5 bg-gradient-to-b from-blue-500 to-blue-700 w-full rounded-b-3xl flex justify-center items-center">
        <p className="text-white text-3xl">Welcome</p>
      </div>
      <div className="h-3/5 p-6 w-full rounded-b-3xl flex flex-col gap-4">
        
        <PrayerTile />
        <PrayerTile />
        <PrayerTile />
        <PrayerTile />
        <PrayerTile />
      </div>
    </main>
  );
}
