"use client"; // needed for useState hook

import { parseWeather } from "./api/weather";
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
      setError("Please enter a valid city name.");
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
      console.error("Error fetching weather: ", err);
      setError("Failed to fetch weather data.");
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

  return(
    <>
      { weather ?
      (
        <p>Weather!</p>
      ):
      (
        <div>
          {citySearch}
          {submitButton}
        </div>
      )}
    </>
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