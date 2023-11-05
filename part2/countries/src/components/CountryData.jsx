function CountryData({ country }) {
  const languages = Object.values(country.languages);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {languages.map(country => (
          <li key={country}>{country}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width={150} />
    </>
  );
}

export default CountryData;
