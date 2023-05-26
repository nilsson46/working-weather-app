<template>
  <div class="forecast-weather">
    <div v-for="(forecast, index) in props.forecastData.slice(1, 10)" :key="index" class="forecast-item">
    <img id="icon-img"
    v-if="forecast.weather.length > 0"
    :src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png'"
    />
      <p>Väderförhållanden: {{ forecast.weather[0].description }}</p>
      <p>Tempratur: {{ forecast.main.temp }} °C</p>
      <p> Tidpunkt: {{forecast.dt_txt}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { ForecastDataInterface } from "../modules/types";

const props = defineProps({
  forecastData: {
    type: Array as () => ForecastDataInterface[],
    required: true,
  },
});
</script>

<style>
.forecast-weather{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.forecast-item {
  display: flex;
  background-color: rgb(171, 241, 252);
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
  width: 10rem;
  border-radius: 1rem;
}

#icon-img{
  height: 5rem;
  width: 5rem;
}
</style>