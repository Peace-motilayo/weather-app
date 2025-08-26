import React, { useState, useRef, useEffect } from 'react';
import Geocoding from './Geocoding.jsx';
import FetchWeather from './FetchWeather.jsx';
import MapContent from './Map.jsx'; // Assuming you have a Map component
import './App.css';
import 'leaflet/dist/leaflet.css';


const Weather = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [position, setPosition] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState('');
  const [mapPlace, setMapPlace] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [LOCATION, setLOCATION] = useState('');
// Show the searching space
  const [showSearch, setShowSearch] = useState(false);
  //Autofocus the search input
  const inputRef = useRef(null);
  const [details, setDetails] = useState(false);

  const Details = () => {
	  setDetails(true);
  }

   useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <div className="weather">
      <Geocoding
        setPageLoading={setPageLoading}
        setCurrentLocation={setCurrentLocation}
        setPosition={setPosition}
      />

      {pageLoading ? (
        <p className='loadingPage'><span className='material-symbols-outlined'>progress_activity</span></p>
      ) : (
        <>
	      <div className='header'>
	      {!showSearch && (
	      <div className='locations'>
	      {currentLocation || place || mapPlace ? (
  <h2>{currentLocation || place || mapPlace}</h2>
) : null}
	      </div>
	      )}
	      <p onClick={() => { setShowSearch(!showSearch) }}>
	      {showSearch ? (
              <span className='material-symbols-outlined' id='closeIcon'>close</span>
      ) : (
              <span className='material-symbols-outlined' onClick={() => { inputRef.current.focus(); }}>search</span>
      )}
	      </p>
	      </div>
          <FetchWeather
            setWeather={setWeather}
            setLoading={setLoading}
            LOCATION={LOCATION}
            setLOCATION={setLOCATION}
            setPosition={setPosition}
            position={position}
            place={place}
            setPlace={setPlace}
            notFound={notFound}
            setNotFound={setNotFound}
            currentLocation={currentLocation}
	    setCurrentLocation={setCurrentLocation}
	    showSearch={showSearch}                           setShowSearch={setShowSearch}
            inputRef={inputRef}
	    
          />
	  {!showSearch && (
		  <>
          <MapContent position={position} setPosition={setPosition} mapPlace={mapPlace} setMapPlace={setMapPlace} setCurrentLocation={setCurrentLocation} setPlace={setPlace} />

          {loading ? (
            <p className='loadingWeather'><span className='material-symbols-outlined'>progress_activity</span></p>
          ) : weather ? (
            <>
	      <div className="weatherDetails" >
		  <h2>{weather.main.temp} °C</h2>
              <p style={{ textTransform: 'capitalize' }}> {weather.weather[0].description}</p>
              <input type="button" value="Details -->" onClick={Details} />
	      </div>
            </>
          ) : (
            <p>No weather data yet. Search for a city above.</p>
          )}
		  </>
	  )}
        </>
      )}
    </div>
  );
};

export default Weather;
