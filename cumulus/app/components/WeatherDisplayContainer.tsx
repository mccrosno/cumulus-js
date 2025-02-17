import Image from 'next/image';
import WeatherData from "../utils/weatherInterface";
import { useEffect, useState } from "react";
import getIcon from '../utils/getIcon';
import { error } from 'node:console';

const WeatherDisplayContainer = ({
    children,
    index,
    weather,
    forecastLoaded,
}:{
    children?: React.ReactNode;
    index: number;
    weather: WeatherData | null;
    forecastLoaded: boolean;
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

  const maxTemp = (weather ? weather.daily[index].temp.max : 0).toFixed(0);
  const minTemp = (weather ? weather.daily[index].temp.min : 0).toFixed(0);

  const icon = getIcon(weather ? weather.daily[index].weather[0].icon : '') || '';

  return (
    <div className={`
    flex-1 transition-[opacity, translate] duration-500
    ${loaded ? 'opacity-100 translate-y-[0%]' : 'transition-none opacity-0 translate-y-[50%]'}
    `}>
      <div className="grid justify-items-center">
        <Image
        src={`/svgs/${icon}`}
        width={30}
        height={30}
        alt='Weather Icon'
        />
        <p className="whitespace-nowrap">
          {weather ? minTemp + '° | ' + maxTemp + '°' : 'Loading'}
        </p>
      </div>
    </div>
  );
}

export default WeatherDisplayContainer;