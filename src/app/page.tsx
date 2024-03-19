import Prayers from './prayers';
import dynamic from 'next/dynamic'

const TimeDown = dynamic(() => import('./timedown'), {ssr: false})

export default async function Home() {
  return (
    <main className="flex flex-col h-screen items-start bg-gray-200">
      <div className="h-1/4 bg-gradient-to-b from-blue-500 to-blue-700 w-full rounded-b-3xl flex flex-col justify-center items-center">
        <div className='flex flex-col justify-center items-center'>
        <TimeDown/>
        <p className="text-white text-sm p-2">time to next prayer</p>
        </div>
      </div>
      <Prayers />
    </main>
  );
}
