import axios from "axios";
import type { ForecastDataInterface } from "../modules/types"
import type { WeatherDetailsData } from "../modules/types"

interface GeoLocation {
  lat: number; 
  lon: number;
}

export interface CurrentWeatherData {
  name: string; 
  main: {
    temp: number; 
  };
  weather: {
    description: string;
    icon: string;
  }[];
}




export const fetchGeoLocation = async (city: string): Promise<GeoLocation> => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=eae526c0c59da830ba1afac8ab0f3347`);
    const cities = response.data;

    if (Array.isArray(cities) && cities.length > 0) {
      return cities[0];
    } else {
      throw new Error("No result found.");
    }
  } catch (error) {
    console.error("Failed to fetch geo location data:", error);
    throw new Error("Failed to fetch geo location data.");
  }
};

export const fetchCurrentWeather = async (lat: number, lon: number): Promise<CurrentWeatherData> => {
  try {
    const response = await axios.get<CurrentWeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eae526c0c59da830ba1afac8ab0f3347&units=metric`);
    return response.data;
  } catch(error) {
    throw new Error("Failed to fetch current weather data")
  }
}; 

export const fetchWeatherDetails = async (lat: number, lon: number): Promise<WeatherDetailsData> => {
  try {
    const response = await axios.get<WeatherDetailsData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eae526c0c59da830ba1afac8ab0f3347&units=metric`);
    return response.data;
  } catch(error) {
    throw new Error("Failed to fetch weather details data")
  }
};

export const fetchForecastData = async (lat: number, lon: number): Promise<ForecastDataInterface[]> => {
  try {
    const response = await axios.get<ForecastDataInterface[]>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=eae526c0c59da830ba1afac8ab0f3347&units=metric`);
    return response.data.list; // Modify here to access the list of forecast data
  } catch (error) {
    throw new Error("Failed to fetch forecast weather data");
  }
};
