export interface ForecastDataInterface {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
}

export interface WeatherDetailsData{
name: string; 
main: {
  temp: number; 
  feels_like: number;
  pressure: number; 
  humidity: number;
};
wind: {
  speed: number;
};
weather: {
  main: string; 
  description: string;
}[];
}