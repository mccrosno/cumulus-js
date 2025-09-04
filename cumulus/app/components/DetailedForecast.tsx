import { useEffect, useRef, useState } from "react";
import WeatherData from "../utils/weatherInterface";
import HourDisplay from "./HourDisplay";
import Image from 'next/image';
import getIcon from "../utils/getIcon";

const DetailedForecast = ({
    daySelected,
    weather
}:{
    daySelected : number | null;
    weather: WeatherData;
}) => {

    const [loaded, setLoaded] = useState<boolean>(false);
    const [indexClicked, setIndexClicked] = useState<number>(12);

    useEffect(() => {
        if (daySelected !== null)
        {
            // timer for animation, set loaded true
            const timer = setTimeout(() => setLoaded(true), 1250);
            return () => clearTimeout(timer);
        }
        else
        {
            setLoaded(false);
        }
    }, [daySelected]);

    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
    }, []);

    return (
        <div ref={wrapRef}
        className={`
        flex items-center absolute
        top-[5%] gap-2 rotate-[180deg]
        w-[90%] p-2
        overflow-x-auto custom-scrollbar
        `}>
            {Array.from({length: 13}).map((_, index) => {
                const icon = getIcon(weather.hourly[13 - index].weather[0].icon)
                const hourWeather = weather.hourly[13 - index];
                return (
                    <div key={index} className={`
                    hover:bg-[rgba(255,255,255,0.2)] rotate-[-180deg]
                    flex-none p-4 pb-8 rounded-xl transition-colors duration-500
                    ${indexClicked === index ? `bg-[rgba(255,255,255,0.2)]` : ``}
                    `}
                    onClick={() => {
                    setIndexClicked(index);
                    }}>
                        <HourDisplay index={index} dt={hourWeather.dt} />
                        <Image
                        src={`/svgs/${icon}`}
                        height={40}
                        width={40}
                        alt='Weather Icon'
                        className='mt-4 mb-4'
                        />
                        <div className={`
                            text-center
                        `}>
                            {weather ? hourWeather.temp.toFixed(0) + '°' : 'Loading'}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DetailedForecast;