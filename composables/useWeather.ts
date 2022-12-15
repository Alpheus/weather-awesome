import { useLocalStorage, useGeolocation } from '@vueuse/core';

// It is reasonable to assume this device won't move substantially in 5 minutes
const cacheKey = (date: Date): string => {
  date.setMinutes(Math.floor(date.getMinutes() / 5) * 5);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.toUTCString();
};

const defaultW = {
  temp: 0,
  location: 'Loading...',
  humidity: 0,
  weather: '',
  wind: 0,
  sunrise: '',
  sunset: '',
};

export const useWeather = () => {
  const config = useRuntimeConfig();
  const { coords, error: geoError } = useGeolocation();
  const localCache = useLocalStorage('weather-cache', {
    fetchedAt: '',
    weather: defaultW,
  });

  const weatherData = useAsyncData('weather', async () => {
    if (geoError.value) return defaultW;
    if (coords.value.longitude == 0) return defaultW;
    if (coords.value.longitude == Infinity) return defaultW;

    let response;

    const newSyncKey = cacheKey(new Date());

    if (localCache.value.fetchedAt == newSyncKey) {
      return localCache.value.weather;
    }

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

    const weather = {
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

    localCache.value = { fetchedAt: newSyncKey, weather: weather };

    return weather;
  });

  const unwatch = watch(coords, (newCoord, oldCoord) => {
    if (newCoord == oldCoord) return;
    if (newCoord.longitude == Infinity) return;
    weatherData.refresh();
    unwatch();
  });

  return weatherData;
};
