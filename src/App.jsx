import React, { useState, useRef, useEffect } from 'react';
import Geocoding from './Geocoding.jsx';
import FetchWeather from './FetchWeather.jsx';
import Map from './Map.jsx'; // Assuming you have a Map component
import './App.css';
import 'leaflet/dist/leaflet.css';


const Weather = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [position, setPosition] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [LOCATION, setLOCATION] = useState('');
// Show the searching space
  const [showSearch, setShowSearch] = useState(false);
  //Autofocus the search input
  const inputRef = useRef(null);

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
	      {currentLocation ? (
		      <h2>{currentLocation}</h2>
	      ):(
		      <h2>{place}</h2>
	      )}
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
          <Map position={position} setPosition={setPosition} />

          {loading ? (
            <p className='loadingWeather'><span className='material-symbols-outlined'>progress_activity</span></p>
          ) : weather ? (
            <>
	      <div style={{color: 'white'}} >
		  <h2>{weather.main.temp} °C</h2>
              <p style={{ textTransform: 'capitalize' }}> {weather.weather[0].description}</p>
              <p>
                Local Time:{' '}
                {new Date(Date.now() + weather.timezone * 1000).toUTCString()}
              </p>
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
