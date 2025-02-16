import Image from 'next/image';
import WeatherData from "../utils/weatherInterface";
import { useEffect, useState } from "react";
import { time } from 'console';

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
  const [city, setCity] = useState("");

  useEffect(() => {
    if (forecastLoaded)
    {
      const timer = setTimeout(() => setLoaded(true), 500 * index);
      return () => clearTimeout(timer);
    }
    else
    {
      setLoaded(false);
    }
  }, [forecastLoaded]);

  return (
    <div className={`
    flex-1 transition-[opacity, translate] duration-500
    ${loaded ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[50%]'}
    `}>
      <div className="grid justify-items-center">
        <Image
        src='/svgs/cloudy.svg'
        width={30}
        height={30}
        alt='Weather Icon'
        />
        <p className="whitespace-nowrap">
          {weather ? weather.list[0].main.temp : 'Loading'} °F
        </p>
      </div>
    </div>
  );
}

export default WeatherDisplayContainer;