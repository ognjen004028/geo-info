import React, { useState, useEffect } from 'react';
import Currency from './Currency';

function DisplayLocation() {
  const userAgent = 'geo-info/1.0 (https://github.com/ognjen004028/geo-info)';
  const debounceTimeout = 1000; // 1 second

  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    let timeoutId = null;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
        console.log(position);
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
      .then(response => response.json())
      .then(data => {
        const address = data.address;
        const city = address.city || address.town || address.village;
        const country = address.country;
        setLocation(`${city}, ${country}`);
        setCountry(country); // Set the country state
      })
      .catch(error => console.error(error));
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

  return (
    <div>
      <h2>Display Location</h2>
      <p>Latitude: {position.coords.latitude}</p>
      <p>Longitude: {position.coords.longitude}</p>
      <p className='location'>Location: {location}</p>
      <Currency country={country} /> 
     
      <p>
        <i>Data provided by <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under the{' '}
        <a href="https://opendatacommons.org/licenses/odbl/">ODbL license</a>.</i>
      </p>
    </div>
  );
}

export default DisplayLocation;