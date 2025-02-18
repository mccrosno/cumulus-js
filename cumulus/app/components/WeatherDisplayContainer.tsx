import Image from 'next/image';
import WeatherData from "../utils/weatherInterface";
import { useEffect, useState } from "react";
import getIcon from '../utils/getIcon';
import getDate from '../utils/getDate';
import MemoTempBar from './TempBar';

const WeatherDisplayContainer = ({
    index,
    weather,
    forecastLoaded,
    tempExtrema,
}:{
    index: number;
    weather: WeatherData | null;
    forecastLoaded: boolean;
    tempExtrema: {min: number, max: number} | null;
}) => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (forecastLoaded)
    {
      const timer = setTimeout(() => setLoaded(true), 250 * index);
      return () => clearTimeout(timer);
    }
    else
    {
      setLoaded(false);
    }
  }, [forecastLoaded]);

  const maxDailyTemp = (weather ? weather.daily[index].temp.max : 0);
  const minDailyTemp = (weather ? weather.daily[index].temp.min : 0);

  const icon = getIcon(weather ? weather.daily[index].weather[0].icon : '') || null;
  const date = getDate(weather ? weather.daily[index].dt : 0) || null;
  
  const weeklyDisplayWidth = ((maxDailyTemp - minDailyTemp) / (tempExtrema ? tempExtrema.max - tempExtrema.min : maxDailyTemp - minDailyTemp) * 100);
  const weeklyDisplayOffset = ((minDailyTemp -  (tempExtrema ? tempExtrema.min : minDailyTemp)) / (tempExtrema ? tempExtrema.max - tempExtrema.min : maxDailyTemp - minDailyTemp) * 100);

  return (
    <div className={`
    flex-1 transition-[opacity, translate] duration-500
    ${loaded ? 'opacity-100 translate-y-[0%]' : 'transition-none opacity-0 translate-y-[50%]'}
    `}>
      <div className="grid justify-items-center">
        <Image
        src={`/svgs/${icon}`}
        width={50}
        height={50}
        alt='Weather Icon'
        className='mb-4'
        />
        <p className="whitespace-nowrap">
          {date ? ((index === 0) ? 'Today' : date.weekday) : 'Loading'}
        </p>
        <div className="flex whitespace-nowrap gap-2 justify-evenly items-center">
          <p>
            {weather ? minDailyTemp.toFixed(0) + '°' : 'Loading'}
          </p>
          <div className="w-16 h-1.5 rounded-full bg-[rgba(0,0,0,0.2)]">
            <div className="relative w-16 h-1.5 rounded-full bg-[rgba(0,0,0,0.2)]">
              <div
                className="absolute h-1.5 rounded-full bg-gradient-to-r from-blue-200 to-orange-200"
                style={{ 
                  width: `${weeklyDisplayWidth}%`,
                  left: `${weeklyDisplayOffset}%`,
                }}
              ></div>
            </div>
          </div>
          <p>
            {weather ? maxDailyTemp.toFixed(0) + '°' : 'Loading'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplayContainer;