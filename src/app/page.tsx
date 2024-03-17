import Prayers from './prayers';
import {Prayer} from "./interfaces";
import { promises as fs} from 'fs';
import dynamic from 'next/dynamic'

const TimeDown = dynamic(() => import('./timedown'), {ssr: false})

export default async function Home() {
  const today = new Date();
  const todayStr = today.toISOString().substr(0, 10);
  const file = await fs.readFile(process.cwd()+'/src/app/data.json', 'utf8');
  const data = JSON.parse(file);
  const prayers :Prayer[] = data[todayStr];

  return (
    <main className="flex flex-col h-screen items-start bg-gray-200">
      <div className="h-1/4 bg-gradient-to-b from-blue-500 to-blue-700 w-full rounded-b-3xl flex flex-col justify-center items-center">
        {prayers.length > 0 ? <TimeDown/> : <span className="text-white">...</span>}
        <p className="text-white text-sm p-2">time to next prayer</p>
      </div>
      <Prayers />
    </main>
  );
}
