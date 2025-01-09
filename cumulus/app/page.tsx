"use client"; // needed for useState hook

import { parseWeather } from "./api/weather";
import { useState } from "react";

export default function WeatherDisplay() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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

  return(
    <>
      <div className="relative h-screen bg-gradient-to-t from-blue-200 via-blue-300 via-5% to-blue-400 to-70%">
        <input
          name='citySearch'
          type='text'
          value={city}
          placeholder='Enter your city...'
          onChange={event => setCity(event.target.value)} // when input is changed, sets city to contents of html element
        />
        <button
        onClick={getWeather}
        className="bg-blue-600"
        >
          Submit
        </button>
        { weather != null && 
          <div>
            <h2>Weather in {weather.city.name}</h2>
            <p>Temperature: {weather.list[0].main.temp}°F</p>
          </div>
        }
      </div>
    </>
  );

};