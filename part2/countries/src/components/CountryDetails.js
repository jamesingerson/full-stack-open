const CountryDetails = ({ country }) => (
  <>
    <h1>{country.name.common}</h1>
    <p>Capital {country.capital}</p>
    <p>Area {country.area}</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <span style={{ fontSize: "20em" }}>{country.flag}</span>
  </>
);

export default CountryDetails;
