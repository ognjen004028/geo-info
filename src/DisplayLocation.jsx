import React, { useState, useEffect } from 'react';
import Currency from './Currency';
import Weather from './Weather';

function DisplayLocation() {
  const userAgent = 'geo-info/1.0 (https://github.com/ognjen004028/geo-info)';
  const debounceTimeout = 1000; 

  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState('Loading');

  useEffect(() => {
    let timeoutId = null;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          getCityName(position.coords.latitude, position.coords.longitude);
        }, debounceTimeout);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  const getCityName = (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const headers = {
      'User-Agent': userAgent,
    };

    fetch(url, { headers })
     .then((response) => response.json())
     .then((data) => {
        const address = data.address;
        const city = address.city || address.town || address.village;
        const country = address.country;

        setLocation(`${city}, ${country}`);
        setCountry(country); 
      })
     .catch((error) => console.error(error));
  };

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!position) {
    return (
      <div>
        <h1>Getting location...</h1>
      </div>
    );
  }

  if (country === 'Loading') {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h3>User Location:</h3>
      <ul>
        <li>Latitude: {position.coords.latitude}</li>
        <li>Longitude: {position.coords.longitude}</li>
        <li>Location: {location}</li>
      </ul>

      <Currency country={country} /> 
      <Weather latitude={position.coords.latitude} longitude={position.coords.longitude} />

      <p className='licences'>
        <a>Licences:</a><br />
        <i>
          Location data provided by <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under the{' '}
          <a href="https://opendatacommons.org/licenses/odbl/">ODbL license</a>. <br />

          <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a> <br />
          <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a> <br /> 

          <a href='https://github.com/ognjen004028/geo-info'>GitHub: geo-info</a> by <a href='https://github.com/ognjen004028'>ognjen004028</a>
        </i>
      </p>
    </div>
  );
}

export default DisplayLocation;