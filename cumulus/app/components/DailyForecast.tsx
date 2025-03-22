import Image from 'next/image';
import { useEffect, useState, memo } from "react";
import getIcon from '../utils/getIcon';
import getDate from '../utils/getDate';
import TempBar from './TempBar';

const DailyForecast = ({
  index,
  weather,
  forecastLoaded,
  tempExtrema,
  daySelected,
  setDaySelected,
}:{
  index: number;
  weather: { dt: number; temp: { min: number; max: number }; weather: { icon: string }[] };
  forecastLoaded: boolean;
  tempExtrema: {min: number, max: number};
  daySelected: number | null;
  setDaySelected: (day: number) => void;
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

  const maxDailyTemp = weather.temp.max;
  const minDailyTemp = weather.temp.min;

  const icon = getIcon(weather.weather[0].icon) || null;
  const date = getDate(weather.dt) || null;
  
  const weeklyDisplayWidth = Math.ceil((maxDailyTemp - minDailyTemp) / (tempExtrema ? tempExtrema.max - tempExtrema.min : maxDailyTemp - minDailyTemp) * 100)
  const weeklyDisplayOffset = Math.floor((minDailyTemp -  (tempExtrema ? tempExtrema.min : minDailyTemp)) / (tempExtrema ? tempExtrema.max - tempExtrema.min : maxDailyTemp - minDailyTemp) * 100);

  return (
    <div className={`
    transition-[opacity, translate] duration-500
    flex-1 p-8 pt-12 pb-12 rounded-xl
    hover:bg-[rgba(255,255,255,0.2)]
    ${loaded && daySelected === null ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[50%]'}
    `}
    onClick={() => {
      setDaySelected(index);
    }}
    >
      <div className="grid justify-items-center">
        <Image
        src={`/svgs/${icon}`}
        height={80}
        width={80}
        alt='Weather Icon'
        className='mb-4 h-[80px]'
        />
        <p className="whitespace-nowrap text-xl">
          {date ? ((index === 0) ? 'Today' : date.weekday) : 'Loading'}
        </p>
        <div className="flex whitespace-nowrap gap-2 justify-evenly items-center">
          <p className="text-lg">
            {weather ? minDailyTemp.toFixed(0) + '°' : 'Loading'}
          </p>
          <TempBar width={weeklyDisplayWidth} offset={weeklyDisplayOffset}/>
          <p className="text-lg">
            {weather ? maxDailyTemp.toFixed(0) + '°' : 'Loading'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(DailyForecast);