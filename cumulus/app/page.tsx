import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Weather Display",
  description: "Check the weather in your location.",
  icons: {
    icon: "/sunny_favicon.ico",
  },
};

export default function WeatherDisplay() {
  return(
    <>
      <div className="h-screen bg-gradient-to-t from-blue-200 via-blue-300 via-5% to-blue-400 to-70%"></div>
    </>
  );
};