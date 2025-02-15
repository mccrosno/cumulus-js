import Image from 'next/image';
import WeatherData from "../utils/weatherInterface";

const WeatherDisplayContainer = ({
    children,
    weather,
    forecastLoaded,
}:{
    children?: React.ReactNode;
    weather: WeatherData | null;
    forecastLoaded: boolean;
}) => {

  const containerClasses = `
    flex-1
    transition-[opacity, translate] duration-500
    ${forecastLoaded ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[50%]'}
  `;

  return (
    <div className={containerClasses}>
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