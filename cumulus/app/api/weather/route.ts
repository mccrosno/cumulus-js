import { NextResponse } from 'next/server';

// API key
const API_KEY = process.env.WEATHER_API_KEY?.trim();

// Base url for api
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';

// Yields thread until return
export async function GET(request: Request) {
  // Extract query parameters from the URL
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const units = searchParams.get('units') || 'imperial';

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required.' }, { status: 400 });
  }

  // Construct the URL for the OpenWeatherMap API
  const apiUrl = `${BASE_URL}q=${city}&appid=${API_KEY}&units=${units}`;

  // Fetch the data from OpenWeatherMap
  const response = await fetch(apiUrl);

  if (response.status === 429) {
    return NextResponse.json({ error: 'Error: API limit exceeded!' }, { status: 429 });
  }
  if (response.status === 404) {
    return NextResponse.json({ error: 'Error: City not found!' }, { status: 404 });
  }
  if (!response.ok) {
    return NextResponse.json({ error: `Error: ${response.status} - ${response.statusText}` }, { status: response.status });
  }

  // Parse and return the JSON data
  const weather = await response.json();
  if (!weather) {
    return NextResponse.json({ error: 'Error: JSON Empty!' }, { status: 500 });
  }

  return NextResponse.json(weather);
}
