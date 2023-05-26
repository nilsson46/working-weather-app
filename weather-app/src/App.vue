<script setup lang="ts">
import { ref, computed} from "vue";
import {RouterView } from 'vue-router';
import {
  fetchCurrentWeather,
  fetchWeatherDetails,
  fetchGeoLocation,
  
  fetchForecastData,
  
} from "./service/apiService";
import type {
  CurrentWeatherData,

} from "./service/apiService";
import type {ForecastDataInterface} from "./modules/types"
import type {WeatherDetailsData} from "./modules/types"
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherDetails from "./components/WeatherDetails.vue";
import ForecastWeather from "./components/ForecastWeather.vue"; 
    const currentWeather =ref<CurrentWeatherData | null>(null); 
    const weatherDetails = ref<WeatherDetailsData | null>(null); 
    const forecastData = ref<ForecastDataInterface[] | null> (null);
    const showWeatherDetails = ref(false);
    const noLocationFound = ref("");
    const latestSearches = ref<string[]>([]);
    const maxLatesetSearches = 3;
    const standardCities = ["Göteborg", "Stockholm", "Lund"]
    const inputValue = ref("")
    
    
    const handleWeatherDetail = async () => {
  try {
    const getLocation = await fetchGeoLocation(currentWeather.value?.name || "");
    const data = await fetchWeatherDetails(getLocation.lat, getLocation.lon);
    weatherDetails.value = {
      name: data.name,
      main: data.main,
      wind: data.wind,
      weather: data.weather,
    };

    console.log("Weather details updated:", weatherDetails.value);
  } catch (error) {
    console.error("Error in handleWeatherDetail:", error);
  }
};


const toggleDetails = () => {
  console.log("Toggle details button clicked");
  showWeatherDetails.value = !showWeatherDetails.value;
  console.log("showWeatherDetails:", showWeatherDetails.value);

  if (showWeatherDetails.value && !weatherDetails.value) {
    handleWeatherDetail();
  }
};

const onCitySearched = async (cityName : string) => {
  console.log("City name received in App.vue:", cityName);
  try { 
    noLocationFound.value="";
    const location = await fetchGeoLocation(cityName);
    if (!location) {
      noLocationFound.value ="No location was found on the search, try again";
      return;
    }

    const currentWeatherData = await fetchCurrentWeather(location.lat, location.lon);
    currentWeather.value = {
      name: currentWeatherData.name,
      main: currentWeatherData.main,
      weather: currentWeatherData.weather
    };
    latestSearches.value.unshift(currentWeather.value?.name || "");
    latestSearches.value = latestSearches.value.slice(0, maxLatesetSearches);
    


    const forecastWeatherData = await fetchForecastData(location.lat, location.lon);
    forecastData.value = forecastWeatherData;
  } catch (error) {
    console.error(error);
  }
};
const firstSearch = computed(() => latestSearches.value[0]);
const secondSearch = computed(() => latestSearches.value[1]);
const thirdSearch = computed(() => latestSearches.value[2]);

if (latestSearches.value.length === 0) {
  latestSearches.value.push(...standardCities)
}

const updateInputValue = (value: string) => {
  inputValue.value = value;
  onCitySearched(value);
}
    
</script>

<template>
  <div id ="app">
    <nav-bar></nav-bar>
    <div class="button-section">
    <button class="history-btn" @click="updateInputValue(firstSearch)"> {{ firstSearch }}</button>
    <button class="history-btn" @click="updateInputValue(secondSearch)"> {{ secondSearch }}</button>
    <button class="history-btn" @click="updateInputValue(thirdSearch)"> {{ thirdSearch }}</button>
  </div>
    <search-bar :initialValue="inputValue" @city-searched="onCitySearched"> </search-bar>
    <div v-if="noLocationFound" class="no-location-found">{{ noLocationFound }}</div>
    <div v-if="currentWeather!==null" class="current-weather">
      <img class="current-weather-icon" :src="'http://openweathermap.org/img/wn/' + currentWeather.weather[0].icon + '.png'" />
      <p class="current-weather-p">Stad: {{ currentWeather.name }}</p>
      <p class="current-weather-p">Tempratur: {{ currentWeather.main.temp}} °C</p>
      <p class="current-weather-p">Väderförhållanden: {{ currentWeather.weather[0].description }}</p>
      <button class="weather-details-btn" @click="toggleDetails">Deatails</button>

    </div>  

    <WeatherDetails
  v-if="weatherDetails && showWeatherDetails"
  :wind-speed="weatherDetails.wind.speed"
  :feels_like="weatherDetails.main.feels_like"
  :pressure="weatherDetails.main.pressure"
  :humidity="weatherDetails.main.humidity"
></WeatherDetails>
    <div>
      <ForecastWeather v-if="forecastData !== null" :forecastData="forecastData">
      </ForecastWeather>
    </div>
    <RouterView />
  </div>
  
</template>

<style scoped>
 #app{
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color:#FFFFFF ;
  border-radius: 0.5rem;
  padding: 1rem;
 }

 .weather-details-btn{
  background-color:rgb(207, 249, 255);;
  border: 0.1rem black solid;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
 }
 .current-weather-p{
  background-color: rgb(207, 249, 255);
  padding: 0.5rem;
  border-radius: 0.5rem;
 }
 .current-weather-icon{
  height: 10rem;
  width: 10rem;
 }
 .current-weather{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
 }
 .button-section{
  display: flex;
  justify-content: center;
 }
 .history-btn{
  background-color: rgb(207, 249, 255);
  border: 0.1rem black solid;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
 }
</style>
