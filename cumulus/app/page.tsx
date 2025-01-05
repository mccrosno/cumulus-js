import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-4xl font-bold text-blue-500">Welcome to Cumulus!</h1>
      <p className="mt-4 text-gray-700">Your weather forecast app is coming soon.</p>
    </div>
  );
}
