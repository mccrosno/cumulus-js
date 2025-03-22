import { useEffect, useState } from "react";

const DetailedForecast = ({
    daySelected,
    weather,
}:{
    daySelected : number | null;
    weather: { dt: number; temp: number; weather: { main: string, description: string, icon: string }[] }[];
}) => {

    const [loaded, setLoaded] = useState<boolean>(false);

    loaded ?? console.log('');

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

    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    return (
        <div className={`
        `}>
            {weather[currentHour].dt}
        </div>
    );
};

export default DetailedForecast;