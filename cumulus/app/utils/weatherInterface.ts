// expand when more functionality is needed
// cannot have weather as <any> because it is not a valid type with ESLint

/*
interface WeatherData_OG
{
  list:
  {
    city:
    {
      name: string;
    }
    main:
    {
      temp: number;
    };
  }[];
};
*/

interface WeatherData
{
  current: {
    temp: number;
  };
  hourly: {
    temp: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
  daily: {
    temp: {
      min: number;
      max: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
  alerts: {
    sender_name: string;
    event: string;
    description: string;
    start: number;
    end: number;
  }[];
}

export default WeatherData;