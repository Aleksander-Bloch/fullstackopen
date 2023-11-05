import { useState } from 'react';
import CountryData from './CountryData';

function ShowCountryData({ country }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      {show && <CountryData country={country} />}
    </div>
  );
}

export default ShowCountryData;
