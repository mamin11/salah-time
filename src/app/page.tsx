import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-start bg-gray-200">
      <div className="h-2/5 bg-gradient-to-b from-blue-500 to-blue-700 w-full rounded-b-3xl flex justify-center items-center">
        <p className="text-white text-3xl">Welcome</p>
      </div>
      <div className="h-3/5 p-6 w-full rounded-b-3xl flex flex-col gap-4">
        <div className="h-24 rounded-2xl w-full bg-white border border-solid border-gray-300"></div>
        <div className="h-24 rounded-2xl w-full bg-white border border-solid border-gray-300"></div>
        <div className="h-24 rounded-2xl w-full bg-white border border-solid border-gray-300"></div>
        <div className="h-24 rounded-2xl w-full bg-white border border-solid border-gray-300"></div>
        <div className="h-24 rounded-2xl w-full bg-white border border-solid border-gray-300"></div>
      </div>
    </main>
  );
}
