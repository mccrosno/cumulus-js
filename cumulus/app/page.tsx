"use client"; // needed for useState hook

// Import API functions and React hooks
import { parseWeather } from "./api/weatherAPI";
import { useEffect, useState } from "react";

// Import Components
import CitySearch from "./components/CitySearch";

// expand when more functionality is needed
// cannot have weather as <any> because it is not a valid type with ESLint
interface WeatherData {
  city: {
    name: string;
  };
  list: {
    main: {
      temp: number;
    };
  }[];
}

export default function WeatherDisplay() {

  // State variables
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

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
      const data = await parseWeather(city);
      setWeather(data); // Save data to state
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
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
    else
    {
      setLoaded(false);
    }
  }, [weather]);

  const bgColor = "bg-gradient-to-t from-blue-200 via-blue-300 via-5% to-blue-500 to-70%";

  return(
    <div className={`flex flex-col min-h-[360] relative items-center transition-colors h-screen overflow-hidden ${bgColor}`}>
      <CitySearch
        city={city}
        setCity={setCity}
        getWeather={getWeather}
        loaded={loaded}
      />
      <div className={`flex absolute top-[45%] translate-y-[-50%] justify-center items-center bg-white rounded-xl
        transition-[opacity,width,height,padding] duration-1000 ${weather ? 'opacity-100 w-[80%]' : 'opacity-0 w-0'} ${loaded ? 'p-4 h-[50%]' : 'p-0.5 h-0'}`}>
        <p className={`text-black transition-[opacity] duration-500 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          Weather!  
        </p>
      </div>
      <div className={`absolute bg-rose-700 p-3 rounded-2xl transition-[bottom] duration-1000 ${error ? 'bottom-[10%]' : 'bottom-[-10%]'}`}>
        { error &&
          <div>
            <p className="text-white"> {error} </p>
          </div>
        }
      </div>
    </div>
  );

};