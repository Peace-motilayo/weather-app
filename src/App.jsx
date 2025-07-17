import React, { useState } from 'react';
import FetchWeather from './FetchWeather.jsx';
import './App.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="weather">
      <FetchWeather setWeather={setWeather} setLoading={setLoading} />

      {loading ? (
        <p>Loading weather data... ⏳</p>
      ) : weather ? (
        <>
          <h2>Weather in {weather.name}</h2>
          <p>Condition: {weather.weather[0].main}</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>
            Local Time:{' '}
            {new Date(Date.now() + weather.timezone * 1000).toUTCString()}
          </p>
        </>
      ) : (
        <p>No weather data yet. Search for a city above.</p>
      )}
    </div>
  );
};

export default Weather;
