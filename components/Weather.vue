<template>
  <div class="weather">
    <AllowGeo />
    <div>Isn't the weather awesome today?</div>
    <h1>Current Weather</h1>

    <div class="weather">
      <span>{{ weather.temp }} | {{ weather.weather }} </span>
    </div>

    <div class="air">
      <div>Humidity: {{ weather.humidity }}</div>
      <div>Wind: {{ weather.wind }}</div>
    </div>
    <div class="sun">
      <div>Sunrise: {{ weather.sunrise }}</div>
      <div>Sunset: {{ weather.sunset }}</div>
    </div>

    <div class="toggle"><span>C</span><Switch /><span> F </span></div>
  </div>
</template>

<style lang="scss">
.toggle {
  display: inline-block;
}

.weather {
  background-color: $primary;
  padding: 20px;
  border-radius: 10px;
  border: $secondary 1px solid;
  color: $text-contrast;
}
</style>

<script lang="ts" setup>
const weather = useCurrentWeather();
</script>
