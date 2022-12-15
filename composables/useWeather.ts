import { useLocalStorage, useGeolocation } from '@vueuse/core';

export const useWeather = () => {
  const config = useRuntimeConfig();
  const { coords, error: geoError } = useGeolocation();

  const {
    data: weather,
    error,
    refresh,
  } = useLazyAsyncData('weather', async () => {
    let response = {};
    let defaultW = {
      temp: null,
      location: 'Loading...',
      humidity: 0,
      weather: '',
      wind: 0,
      sunrise: '',
      sunset: '',
    };

    if (geoError.value) return defaultW;
    if (coords.value.longitude == 0) return defaultW;
    if (coords.value.longitude == Infinity) return defaultW;

    try {
      response = await $fetch(config.weatherUrl, {
        params: {
          lat: coords.value.latitude,
          lon: coords.value.longitude,
          units: 'metric',
          appid: config.publicWeatherKey,
        },
      });
    } catch (e) {}

    return {
      temp: response.main.temp,
      location: `${response.name}, ${response.sys.country}`,
      humidity: response.main.humidity,
      weather: response.weather[0]?.main,
      wind: response.wind.speed,
      sunrise: new Date(response.sys.sunrise * 1000).toLocaleTimeString(
        'default',
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      ),
      sunset: new Date(response.sys.sunset * 1000).toLocaleTimeString(
        'default',
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      ),
    };
  });

  const unwatch = watch(coords, (newCoord, oldCoord) => {
    if (newCoord == oldCoord) return;
    if (newCoord.longitude == Infinity) return;
    refresh();
    unwatch();
  });

  return { weather, error, refresh };
};
