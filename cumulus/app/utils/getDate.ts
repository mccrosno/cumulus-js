export interface WeatherDate {
    second: number;
    minute: number;
    hour: number;
    day: number;
    month: number;
    year: number;
    weekday: string;
};

export const getDate = (dt : number): WeatherDate | null => {

    if (!dt)
    {
        return null;
    }

    const date = new Date(dt * 1000); // dt in seconds to milliseconds

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return {
        second: date.getSeconds(),
        minute: date.getMinutes(),
        hour: date.getHours(),
        day: date.getDate(),
        month: date.getMonth() + 1, // months are 0-based, so add 1
        year: date.getFullYear(),
        weekday: weekdays[date.getDay()],
      };
};

export const getDt = (): number => {
    
    const date = new Date();

    return date.getTime() * 1000;
}

export const getHourDt = (): number => {

    const seconds = getDt();

    return Math.floor(seconds / 3600) * 3600

}

export const get12HTime = (hour: number): number => {

    return ((hour + 11) % 12) + 1;

}

export const isPM = (hour: number): boolean => {

    return (hour - 12 >= 0);

}