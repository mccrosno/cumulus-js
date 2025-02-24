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
    return (
        <div className={`
            flex items-center relative top-[25%]
            transition-[opacity,width,height,top] duration-1000
            ${weather ? 'opacity-100 w-[80%]' : 'opacity-0 w-0'}
            ${loaded ? 'h-[40%]' : 'h-1'}
            ${weather && loaded && (daySelected !== null) ? 'h-[80%] top-[5%]' : ''}
            ${glassmorphic()}
            gradBorder overflow-x-auto overflow-y-clip custom-scrollbar
        `}>
            <i></i>
            <div className="flex p-4 gap-8 w-full">
                {children}
            </div>
        </div>
    );
}
  
export default WeatherContainer;