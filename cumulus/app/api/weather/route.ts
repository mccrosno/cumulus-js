import { NextResponse } from 'next/server';

// API key
const API_KEY = process.env.WEATHER_API_KEY?.trim();

// Base URL for Geolocation API (city to lat/long)
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct?'

// Base URL for Weather API (lat/long to weather data)
const WEATHER_URL = 'https://api.openweathermap.org/data/3.0/onecall?';

export async function GET(request: Request) {

  // Extract query parameters from the URL
  const {searchParams} = new URL(request.url);
  const city = searchParams.get('city');
  const units = searchParams.get('units') || 'imperial';

  if (!city)
  {
    return NextResponse.json({error: 'City parameter is required.'}, {status: 400});
  }

  // Construct URL for Geolocation API
  const geoUrl = `${GEO_URL}q=${city}&appid=${API_KEY}`;

  // Fetch data from Geolocation API
  const geoResponse = await fetch(geoUrl);

  if (geoResponse.status === 429)
  {
    return NextResponse.json({error: 'Error: API limit exceeded!'}, {status: 429});
  }
  if (geoResponse.status === 404)
  {
    return NextResponse.json({error: 'Error: City not found!'}, {status: 404});
  }
  if (!geoResponse.ok)
  {
    return NextResponse.json({error: `Error: ${geoResponse.status} - ${geoResponse.statusText}`}, {status: geoResponse.status});
  }

  // Parse JSON data from Geolocation API
  const geoData = await geoResponse.json();
  if (!geoData[0])
  {
    return NextResponse.json({error: 'Error: City not found!'}, {status: 404});
  }

  // Extract latitude and longitude from Geolocation API
  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  // Construct URL for Weather API
  const weatherUrl = `${WEATHER_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;

  // Fetch data from Weather API
  const weatherResponse = await fetch(weatherUrl);

  if (weatherResponse.status === 429)
  {
    return NextResponse.json({error: 'Error: API limit exceeded!'}, {status: 429});
  }
  if (weatherResponse.status === 404)
  {
    return NextResponse.json({error: 'Error: City not found!'}, {status: 404});
  }
  if (!weatherResponse.ok)
  {
    return NextResponse.json({error: `Error: ${weatherResponse.status} - ${weatherResponse.statusText}`}, {status: weatherResponse.status});
  }

  // Parse JSON data from Weather API
  const weather = await weatherResponse.json();

  if (!weather || !weather.current)
  {
    return NextResponse.json({error: 'Error: Weather not found!'}, {status: 500});
  }

  return NextResponse.json(weather);
}