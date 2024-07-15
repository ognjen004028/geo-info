import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function Weather({ latitude, longitude }) {
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [nextDayForecast, setNextDayForecast] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=2&models=metno_seamless`;
    fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
        const currentTemperature = data.hourly.temperature_2m[0];
        setCurrentTemperature(currentTemperature);

        const nextDayForecast = data.hourly.temperature_2m.slice(24, 48);
        setNextDayForecast(nextDayForecast);
      })
     .catch(error => console.error(error));
  }, [latitude, longitude]);

  return (
    <div>
      <h3>Current Weather</h3>
      {currentTemperature? (
        <ul>
            <li>Temperature: {currentTemperature}°C</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      <h3>Forecast for Tomorrow</h3>
      {nextDayForecast? (
        <LineChart width={400} height={200} data={nextDayForecast.map((temperature, index) => ({ hour: index, temperature }))}>
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <XAxis dataKey="hour" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
        </LineChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;