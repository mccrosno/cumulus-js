import { get12HTime, getDate, isPM, WeatherDate } from "../utils/getDate";

const HourDisplay = ({
    index,
    dt,
}:{
    index: number;
    dt: number;
}) => {

    const date: WeatherDate | null = getDate(dt);
    let hour: number = index
    let pm: boolean = false

    if (date) {
        hour = get12HTime(date.hour);
        if (isPM(date.hour)) pm = true;
    }

    return (
        <div className={`
            text-center
        `}>
            {index === 12 ? 'Now' : hour.toString() + (pm ? ' PM' : ' AM')}
        </div>
        
    );
};

export default HourDisplay;