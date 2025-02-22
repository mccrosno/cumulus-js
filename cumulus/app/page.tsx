"use client"; // needed for useState hook

// Import API functions and React hooks
import { useEffect, useState } from "react";
import WeatherData from "./utils/weatherInterface";

// Import Components
import CitySearch from "./components/CitySearch";
import WeatherContainer from "./components/WeatherContainer";
import ErrorHandler from "./components/ErrorHandler";
import WeatherDisplayContainer from "./components/WeatherDisplayContainer";
import getTempExtrema from "./utils/getTempExtrema";

export default function WeatherPage() {

  // State variables
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [forecastLoaded, setForecastLoaded] = useState<boolean>(false);
  const [weeklyExtrema, setWeeklyExtrema] = useState<{min: number, max: number} | null>(null);

  // Fetches weather data from API
  const getWeather = async () =>
  {
    if (!city.trim())
    {
      setWeather(null); // Clear previous weather
      setError("Error: Please enter a valid city name.");
      return;
    }
    try
    {
      setError(null); // Clear previous errors
      const result = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!result.ok)
      {
        const data = await result.json();
        throw new Error(data.error || "An unknown error occurred.");
      }
      const data = await result.json();
      setWeather(data);
    }
    catch (err)
    {
      setWeather(null); // Clear previous weather
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error: An unknown error occurred.");
      }
    }
  };

  // Animate weather display
  useEffect(() => {
    if (weather) {
      setWeeklyExtrema(getTempExtrema(weather));
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
    else
    {
      setLoaded(false);
    }
  }, [weather]);

  // Animate forecast display
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setForecastLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
    else
    {
      setForecastLoaded(false);
    }
  }, [loaded]);

  const bgColor = "bg-gradient-to-t from-blue-200 via-blue-300 via-5% to-blue-500 to-70%";

  return(
    <div className={`flex flex-col min-h-[360] relative items-center transition-colors h-screen overflow-hidden ${bgColor}`}>
      <CitySearch
        city={city}
        setCity={setCity}
        getWeather={getWeather}
        loaded={loaded}
      />
        <WeatherContainer weather={weather} loaded={loaded}> 
        {weather && weeklyExtrema ? (
          Array.from({ length: 7 }).map((_, index) => {
            const dailyWeather = weather.daily[index]; // Extract only needed data

            return (
              <WeatherDisplayContainer 
                key={index} 
                index={index} 
                weather={dailyWeather}  // Pass only relevant data
                forecastLoaded={forecastLoaded} 
                tempExtrema={weeklyExtrema}
              />
            );
          })
        ) : null}
        </WeatherContainer>
      <ErrorHandler error={error} />
      {/* Simulated Cloud 
      <p className={`bg-white text-black absolute top-[50%] opacity-[80%] right-[0%] -translate-y-[50%] w-[50%] h-[20%] rounded-full blur-2xl`}> Test </p>*/}
    </div>
  );
};