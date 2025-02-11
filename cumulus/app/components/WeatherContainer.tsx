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
        flex absolute top-[45%] translate-y-[-50%] justify-evenly items-center rounded-xl
        transition-[opacity,width,height,padding] duration-1000
        ${weather ? 'opacity-100 w-[80%]' : 'opacity-0 w-0'}
        ${loaded ? 'p-4 h-[50%]' : 'p-0.5 h-0'}
        ${glassmorphic()}
    `;

    return (
        <div className={`${containerClasses} gradBorder`}>
            <i></i>
            <div>
                {children}
            </div>
        </div>
    );
}
  
export default WeatherContainer;