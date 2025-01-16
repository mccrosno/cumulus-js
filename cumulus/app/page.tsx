"use client"; // needed for useState hook

import { parseWeather } from "./api/weatherAPI";
import { useState } from "react";

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

  // HTML elements
  const citySearch = (
    <input
      className="border px-4 py-2 rounded-l-xl text-black"
      name='citySearch'
      type='text'
      value={city}
      placeholder='Enter your city...'
      onChange={event => setCity(event.target.value)} // when input is changed, sets city to contents of html element
    />
  );

  const submitButton = (
    <button
    className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600"
    onClick={getWeather}
    >
      Submit
    </button>
  );

  const bgColor = "bg-gradient-to-t from-blue-200 via-blue-300 via-5% to-blue-500 to-70%";

  return(
    <div className={`flex transition-colors justify-center items-center h-screen ${bgColor}`}>
      <div className={`absolute transition-all duration-1000 ${weather ? 'top-2/3' : 'top-1/2'}`}>
          {citySearch}
          {submitButton}
      </div>
      <div className={`transition-all duration-1000 ${weather ? 'opacity-100' : 'opacity-0'}`}>
        { weather &&
          <div>
            <h2>Weather in {weather.city.name}</h2>
            <p>Temperature: {weather.list[0].main.temp}°F</p>
          </div>
        }
      </div>
      <div className={`absolute bg-rose-700 p-3 rounded-2xl transition-all duration-1000 ${error ? 'top-[90%]' : 'top-[110%]'}`}>
        { error &&
          <div>
            <p className="text-white"> {error} </p>
          </div>
        }
      </div>
    </div>
  );

};


/* OLD DESIGN
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-t from-blue-200 via-blue-300 via-5% to-blue-400 to-70%">
        <div className="absolute bottom-10 flex justify-center items-center">
          <input
            className="border px-4 py-2 rounded-l-xl text-black"
            name='citySearch'
            type='text'
            value={city}
            placeholder='Enter your city...'
            onChange={event => setCity(event.target.value)} // when input is changed, sets city to contents of html element
          />
          <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600"
          onClick={getWeather}
          >
            Submit
          </button>
        </div>
        { error ? (<p className="text-red-500"> Error! </p>) :
        (null) }
        { weather && (
          <div>
            <h2>Weather in {weather.city.name}</h2>
            <p>Temperature: {weather.list[0].main.temp}°F</p>
          </div>
        )}
      </div>
    </>
*/