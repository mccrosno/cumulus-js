const WeatherContainer = ({
    weather,
    loaded,
    children,
}: {
    weather: any;
    loaded: boolean;
    children: React.ReactNode;
}) => {
    return (
        <div className={`flex absolute top-[45%] translate-y-[-50%] justify-center items-center bg-white rounded-xl
        transition-[opacity,width,height,padding] duration-1000 ${weather ? 'opacity-100 w-[80%]' : 'opacity-0 w-0'}
        ${loaded ? 'p-4 h-[50%]' : 'p-0.5 h-0'}`}>
            {children}
        </div>
    );
}
  
export default WeatherContainer;