<template>
    <div class="weather-details">
      <div>Känns som: {{ feelsLike }} °C</div>
      <div>Vindhastighet: {{ windSpeed }} m/s</div>
      <div>Tryck: {{ pressure }} hPa</div>
      <div>Fuktighet: {{ humidity }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from "vue";
  
  const props = defineProps({
    windSpeed: Number,
    feelsLike: Number,
    pressure: Number,
    humidity: Number,
  });
  </script>
  
  <style>
  .weather-details {
    background-color: rgb(121, 234, 251);
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  </style>

