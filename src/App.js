import React, { useState, useEffect } from 'react';
import CurrencyConverter from './components/Converter/CurrencyConverter';

import './App.css'

function App() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.forexrateapi.com/v1/latest?api_key=b476bd58010a4eae0a3f74ed23434dd6&base=USD&currencies='
        );
        const data = await response.json();
        setExchangeRates(data.rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='app-container'>
      <h1 >Forex Rate App</h1>
      {loading ? <p>Loading...</p> : <CurrencyConverter exchangeRates={exchangeRates} />}
    </div>
  );
}

export default App;
