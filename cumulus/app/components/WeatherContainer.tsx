import glassmorphic from "../utils/glassmorphic";
import WeatherData from "../utils/weatherInterface";
import '../styles/gradientBorder.css';

const WeatherContainer = ({
    weather,
    loaded,
    daySelected,
    children,
}: {
    weather: WeatherData | null;
    loaded: boolean;
    daySelected: number | null;
    children: React.ReactNode;
}) => {

    console.log(weather && loaded && daySelected !== null ? 'h-[80%] top-[5%]' : '');

    return (
        <div className={`
            flex items-center relative
            transition-[opacity,width,height,top] duration-1000
            ${weather ? 'opacity-100 w-[80%]' : 'opacity-0 w-0'}
            ${loaded && daySelected === null ? 'h-[50%]' : 'h-1'}
            ${weather && loaded && daySelected !== null ? 'top-[5%] h-[80%]' : 'top-[20%]'}
            ${glassmorphic()}
            gradBorder overflow-y-clip custom-scrollbar
            ${weather && loaded && daySelected === null ? `overflow-x-auto` : `overflow-x-clip`}
        `}>
            <i></i>
            <div className="flex p-4 gap-8">
                {children}
            </div>
        </div>
    );
}
  
export default WeatherContainer;