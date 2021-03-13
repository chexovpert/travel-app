import { React, useEffect, useState } from "react";

export default () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("weather-icon owf");
  const [temperature, setTepmerature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windspeed, setWindspeed] = useState(null);
  const [cityName, setCityName] = useState(null);

  async function getWeather(city, lang) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=d1c713282a45ed61c17e8cf0ee9ae24f&units=metric`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data.weather[0].id);

      setWeatherData(data);
      console.log(data);
      setCityName(data.name);
      setWeatherIcon(
        "weather__icon weather-icon owf " + `owf-${data.weather[0].id}`
      );
      setWeather(data.weather[0].description.toUpperCase());
      setTepmerature(`${Math.round(data.main.temp)}°C`);
      setHumidity(`${data.main.humidity}%`);
      setWindspeed(`${data.wind.speed}m/s`);
    } catch (error) {
      throw new Error("error");
    }
  }
  useEffect(() => getWeather("Minsk", "en"), []);
  return (
    <div className="weather">
      <div className="weather__city">{cityName}</div>
      <div className={weatherIcon}></div>
      <div className="weather__data">{weather}</div>
      <div className="weather__data">
        {temperature}, {humidity}, {windspeed}
      </div>
    </div>
  );
};
