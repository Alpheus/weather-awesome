// WeatherForecastCondensed

export default function () {
  return useState('currentWeather', () => ({
    temp: 15,
    weather: 'Cloudy',
    location: 'London',
    humidity: 10,
    wind: 15,
    sunrise: '8:15',
    sunset: '20:40',
  }));
}
