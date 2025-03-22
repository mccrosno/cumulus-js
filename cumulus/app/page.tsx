"use client"; // needed for useState hook

// Import API functions and React hooks
import { useEffect, useState } from "react";
import WeatherData from "./utils/weatherInterface";

// Import Components
import CitySearch from "./components/CitySearch";
import WeatherContainer from "./components/WeatherContainer";
import ErrorHandler from "./components/ErrorHandler";
import LoadingCircle from "./components/LoadingCircle";
import getTempExtrema from "./utils/getTempExtrema";
import DailyForecast from "./components/DailyForecast";
import DetailedForecast from "./components/DetailedForecast";

export default function WeatherPage() {

  // State variables
  const [city, setCity] = useState(""); // stores city
  const [weather, setWeather] = useState<WeatherData | null>(null); // stores weather JSON
  const [error, setError] = useState<string | null>(null); // stores error message
  const [loaded, setLoaded] = useState<boolean>(false); // if weather api has been fetched
  const [forecastLoaded, setForecastLoaded] = useState<boolean>(false); // if weekly forecast has been displayed
  const [weeklyExtrema, setWeeklyExtrema] = useState<{min: number, max: number} | null>(null); // stores high/low for week
  const [getWeatherCalled, setGetWeatherCalled] = useState<boolean>(false); // if weather api has been called, but not fetched (for loading circle)
  const [daySelected, setDaySelected] = useState<number | null>(null); // stores selected day for detailed forecast
  const [unloadDailyForecast, setUnloadDailyForecast] = useState<boolean>(false);

  // Fetches weather data from API
  const getWeather = async () =>
  {
    setGetWeatherCalled(true);
    setDaySelected(null);
    if (loaded && weather)
    {
      setForecastLoaded(true);
    }

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
      setGetWeatherCalled(false);
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
    else
    {
      setLoaded(false);
    }
  }, [weather]);

  useEffect(() => {
    if (daySelected !== null)
    {
      const timer = setTimeout(() => {
        setUnloadDailyForecast(true);
        setForecastLoaded(false);
      }, 500)
      return () => clearTimeout(timer);
    }
    else
    {
      setUnloadDailyForecast(false);
    }
  }, [daySelected]);

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
    <div className={`
      flex flex-col relative items-center
      transition-colors h-dvh custom-scrollbar
      overflow-hidden
      ${bgColor}
      `}>
      <CitySearch
        city={city}
        setCity={setCity}
        getWeather={getWeather}
        loaded={loaded}
        daySelected={daySelected}
      />
      <LoadingCircle weatherAPICalled={getWeatherCalled} loaded={loaded} hasError={error !== null}/>
      <WeatherContainer weather={weather} loaded={loaded} daySelected={daySelected}> 
        {weather && weeklyExtrema && !unloadDailyForecast ? (
          Array.from({ length: 7 }).map((_, index) => {
            const dailyWeather = weather.daily[index];
            return (
              <DailyForecast 
                key={index} 
                index={index} 
                weather={dailyWeather}
                forecastLoaded={forecastLoaded}
                //setForecastLoaded={setForecastLoaded}
                tempExtrema={weeklyExtrema}
                daySelected={daySelected}
                setDaySelected={setDaySelected}
              />
            );
          })
        ) : null}
        {weather && daySelected !== null &&
          <DetailedForecast daySelected={daySelected} weather={weather.hourly} />
        }
      </WeatherContainer>
      <ErrorHandler error={error} />
      {/* Simulated Cloud 
      <p className={`bg-white text-black absolute top-[50%] opacity-[80%] right-[0%] -translate-y-[50%] w-[50%] h-[20%] rounded-full blur-2xl`}> Test </p>*/}
    </div>
  );
};