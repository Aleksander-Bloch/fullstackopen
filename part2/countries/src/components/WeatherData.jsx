import axios from 'axios';
import { useEffect, useState } from 'react';

function WeatherData({ capital }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${openWeatherApiKey}`
      )
      .then(response => {
        const data = response.data;
        setWeatherData({
          temperature: new Intl.NumberFormat().format(data.main.temp - 273.15),
          iconId: data.weather[0].icon,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
        });
      })
      .catch(error => console.log(error));
  }, [capital]);

  if (weatherData == null) {
    return;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.iconId}@2x.png`;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weatherData.temperature} Celsius</p>
      <img src={iconUrl} alt={weatherData.description} />
      <p>wind {weatherData.windSpeed} m/s</p>
    </div>
  );
}

export default WeatherData;
