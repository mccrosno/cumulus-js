import WeatherData from "./weatherInterface";

const getTempExtrema = (weatherData: WeatherData): {min : number, max: number} => {

    const dailyArray = weatherData.daily;

    let minTemp = dailyArray[0].temp.min;
    let maxTemp = dailyArray[0].temp.max;

    for (let i = 0; i < 7; i++) // only for the next week
    {
        if (dailyArray[i].temp.min < minTemp)
        {
            minTemp = dailyArray[i].temp.min;
        }
        if (dailyArray[i].temp.max > maxTemp)
        {
            maxTemp = dailyArray[i].temp.max;
        }
    }

    return {
        min: minTemp,
        max: maxTemp,
    };
}

export default getTempExtrema;