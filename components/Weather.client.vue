<template>
  <AllowGeo v-if="!hasGeo" />
  <div v-else class="weather">
    <p>Isn't the weather awesome today?</p>
    <h1>Current Weather</h1>

    <div class="metric">
      <span>{{ convertedTemp }} | {{ weather.weather }} </span>
      <div class="location">
        {{ weather.location }}
      </div>
    </div>

    <div class="air metric">
      <div>Humidity: {{ weather.humidity }}%</div>
      <div>Wind: {{ weather.wind }} m/s</div>
    </div>
    <div class="sun metric">
      <div>Sunrise: {{ weather.sunrise }}</div>
      <div>Sunset: {{ weather.sunset }}</div>
    </div>

    <div class="toggle metric">
      <Switch @update:model-value="toggle" id="tempToggle" /><label
        for="tempToggle"
        >°C / °F</label
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toggle {
  display: flex;
}

.weather {
  background-color: $primary;
  padding: 20px;
  border-radius: 10px;
  border: $secondary 1px solid;
  color: $text-contrast;
  width: 280px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
}

.weather p {
  font-size: 14px;
  font-style: italic;
}
</style>

<script lang="ts" setup>
import { useGeolocation } from '@vueuse/core';
const { data: weather, pending } = useWeather();

const { coords, locatedAt, error: geoError } = useGeolocation();
const hasGeo = computed(() => geoError.value == null && !pending.value);

const temperatureInFahrenheit = ref(false);
const celsiusToFahrenheit = (cel: number): number => cel * 1.8 + 32;
const toggle = (value) => {
  temperatureInFahrenheit.value = value;
};

const convertedTemp = computed(() => {
  const unit = temperatureInFahrenheit.value ? ' °F' : ' °C';
  const converted = temperatureInFahrenheit.value
    ? celsiusToFahrenheit(weather.value.temp)
    : weather.value.temp;

  return Number(converted).toFixed(1) + unit;
});
</script>
