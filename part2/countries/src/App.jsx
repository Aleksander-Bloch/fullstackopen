import axios from 'axios';
import { useEffect, useState } from 'react';
import CountryData from './components/CountryData';
import ShowCountryData from './components/ShowCountryData';

function App() {
  const [countryQuery, setCountryQuery] = useState('');
  const [initialCountries, setInitialCountries] = useState([]);

  function handleCountryQueryChange(event) {
    setCountryQuery(event.target.value);
  }

  function generateQueryResponse() {
    const filteredCountries = initialCountries.filter(country =>
      country.name.common.toLowerCase().startsWith(countryQuery.toLowerCase())
    );
    const numOfFilteredCountries = filteredCountries.length;

    if (numOfFilteredCountries === 1) {
      const singleCountry = filteredCountries[0];
      return <CountryData country={singleCountry} />;
    } else if (numOfFilteredCountries >= 2 && numOfFilteredCountries <= 10) {
      return filteredCountries.map(country => (
        <ShowCountryData key={country.name.common} country={country} />
      ));
    } else if (numOfFilteredCountries > 10) {
      return <p>Too many countries, specify another filter</p>;
    } else {
      return null;
    }
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setInitialCountries(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <label>
        find countries{' '}
        <input
          type='text'
          value={countryQuery}
          onChange={handleCountryQueryChange}
        />
      </label>
      {generateQueryResponse()}
    </div>
  );
}

export default App;
