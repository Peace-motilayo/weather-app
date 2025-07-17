import React, { useState } from 'react';

const FetchWeather = ({ setWeather, setLoading }) => {
  const [city, setCity] = useState("");

  function fetchWeather() {
    if (!city) return;

    setLoading(true); // Show loading
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3dc6c9d76780083750e6e8038d66cb2e&units=metric`)
      .then(res => res.json())
      .then(data => {
        console.log(data); // for debugging
        if (data.cod === 200) {
          setWeather(data);
        } else {
          alert("City not found.");
        }
        setLoading(false); // Hide loading after success or error
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Hide loading if there's an error
      });
  }

  return (
    <>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City ..."
      /><br />
      <button onClick={fetchWeather}>Search</button>
    </>
  );
};

export default FetchWeather;
