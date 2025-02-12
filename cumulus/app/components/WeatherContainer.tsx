import glassmorphic from "../utils/glassmorphic";
import WeatherData from "../utils/weatherInterface";
import '../styles/gradientBorder.css';

const WeatherContainer = ({
    weather,
    loaded,
    children,
}: {
    weather: WeatherData | null;
    loaded: boolean;
    children: React.ReactNode;
}) => {
    const containerClasses = `
        flex items-center absolute top-[25%]
        transition-[opacity,width,height] duration-1000
        ${weather ? 'opacity-100 w-[80%]' : 'opacity-0 w-0'}
        ${loaded ? 'h-[40%]' : 'h-0'}
        ${glassmorphic()}
    `;

    return (
        <div className={`${containerClasses} gradBorder`}>
            <i></i>
            <div className="flex p-4 gap-4 justify-between items-center">
                {children}
            </div>
        </div>
    );
}
  
export default WeatherContainer;