import axios from 'axios';
import { useEffect, useState } from 'react';

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
    let generatedContent = null;

    if (numOfFilteredCountries === 1) {
      const singleCountry = filteredCountries[0];
      const languages = Object.values(singleCountry.languages);

      generatedContent = [
        <h1 key='name'>{singleCountry.name.common}</h1>,
        <p key='capital'>capital {singleCountry.capital[0]}</p>,
        <p key='area'>area {singleCountry.area}</p>,
        <b key='languages-title'>languages:</b>,
        <ul key='languages-list'>
          {languages.map(country => (
            <li key={country}>{country}</li>
          ))}
        </ul>,
        <img
          key='flag'
          src={singleCountry.flags.svg}
          alt={singleCountry.flags.alt}
          width={150}
        />,
      ];
    } else if (numOfFilteredCountries >= 2 && numOfFilteredCountries <= 10) {
      generatedContent = filteredCountries.map(country => (
        <p key={country.name.common}>{country.name.common}</p>
      ));
    } else if (numOfFilteredCountries > 10) {
      generatedContent = <p>Too many countries, specify another filter</p>;
    }

    return generatedContent;
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setInitialCountries(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <label>
      find countries{' '}
      <input
        type='text'
        value={countryQuery}
        onChange={handleCountryQueryChange}
      />
      {generateQueryResponse()}
    </label>
  );
}

export default App;
