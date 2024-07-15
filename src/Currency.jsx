import React, { useState, useEffect } from 'react';
import {getISOByParam, getParamByParam} from 'iso-country-currency';

function Currency({ country }) {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  
  //const countryCode = getISOByParam('countryName',country);
  const countryCurrency = getParamByParam('countryName',country,'currency');

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${countryCurrency}`);
        const data = await response.json();
        setExchangeRates(data.rates);
        setLoading(false);
        
      } catch (error) {
        setError(error);
        setLoading(false);
        
      }
    };

    if (country) {
      fetchExchangeRates();
    }
  }, [country]);

  if (loading) {
    return <p>Loading exchange rates...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!exchangeRates) {
    return <p>No exchange rates available for {country}.</p>;
  }

  return (
    <div>
      <h3>Exchange Rates for {country}</h3>
      <ul>
        <li>1 USD = {exchangeRates.USD} {countryCurrency}</li>
        <li>1 EUR = {exchangeRates.EUR} {countryCurrency}</li>
      </ul>
    </div>
  );
}

export default Currency;