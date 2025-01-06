const API_KEY = '7afb70684b5202f4d7308dbcfb8ef7f5';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?';

// Yields thread until return
export async function getWeather(city : string)
{   
    // Fetches webpage with api
    const response = await fetch(`${BASE_URL}q=${city}&appid=${API_KEY}`);

    // No api requests left
    if (response.status == 429)
    {
        throw new Error('Error: API limit exceeded!');
    }
    // Other error
    else if (!response.ok)
    {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parses json into useable data
    const weather = await response.json();

    // If data is empty
    if (!weather) {
        throw new Error('Error: JSON Empty!');
    }

    // Returns weather
    return weather
}