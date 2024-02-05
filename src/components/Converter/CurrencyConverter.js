// src/components/CurrencyConverter.js

import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = ({ exchangeRates }) => {
  const [usdAmount, setUsdAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(Object.keys(exchangeRates)[0]);
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    if (usdAmount === '' || isNaN(usdAmount)) {
      setConvertedAmount('');
      return;
    }

    const rate = exchangeRates[selectedCurrency];
    const converted = (parseFloat(usdAmount) * rate).toFixed(2);
    setConvertedAmount(`${converted} ${selectedCurrency}`);
  }, [usdAmount, selectedCurrency, exchangeRates]);

  const handleConvert = () => {
    if (usdAmount !== '' && !isNaN(usdAmount)) {
      const rate = exchangeRates[selectedCurrency];
      const converted = (parseFloat(usdAmount) * rate).toFixed(2);
      setConvertedAmount(`${converted} ${selectedCurrency}`);
    }
  };

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <div className="input-group">
        <label className="label">Amount in USD:</label>
        <input
          className="input"
          type="number"
          value={usdAmount}
          onChange={(e) => setUsdAmount(e.target.value)}
          placeholder="Enter USD amount"
        />
      </div>
      <div className="input-group">
        <label className="label">Select Currency:</label>
        <select
          className="select"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button className="button" onClick={handleConvert}>
        Convert
      </button>
      <p className="result">{convertedAmount !== '' && `Converted: ${convertedAmount}`}</p>
    </div>
  );
};

export default CurrencyConverter;
