import { useState, useEffect } from 'react';

function DisplayLocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const userAgent = 'MyReactApp/1.0 (https://example.com)';
    const debounceTimeout = 1000; // 1 second

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
        setCity(city);
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
      <p>City: {city}</p>
      <p>
        Data provided by <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under the{' '}
        <a href="https://opendatacommons.org/licenses/odbl/">ODbL license</a>.
      </p>
    </div>
  );
}

export default DisplayLocation;