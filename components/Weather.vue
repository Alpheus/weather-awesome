<script lang="ts" setup>
const weather = useCurrentWeather();
</script>

<style lang="scss">
.toggle {
  display: inline-block;
}
</style>

<template>
  <div class="weather">
    <div>Isn't the weather awesome today?</div>
    <h1>Current Weather</h1>

    <span>{{ weather.temp }} | {{ weather.weather }} </span>

    <div>Humidity: {{ weather.humidity }}</div>
    <div>Wind: {{ weather.wind }}</div>
    <div>Sunrise: {{ weather.sunrise }}</div>
    <div>Sunset: {{ weather.sunset }}</div>

    <div class="toggle"><span>C</span><Switch /><span> F </span></div>
  </div>
</template>
