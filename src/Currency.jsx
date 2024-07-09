import React from 'react';

const currencyMap = {
  'United States': 'USD',
  'Canada': 'CAD',
  'United Kingdom': 'GBP',
  'Serbia': 'RSD',
  // Add more countries and their corresponding currencies
};

function Currency({ country }) {
  const currency = currencyMap[country];

  if (!currency) {
    return <p>Unknown currency</p>;
  }

  return <p>Currency: {currency}</p>;
}

export default Currency;