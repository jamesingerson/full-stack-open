import { useState, useEffect } from "react";
import axios from "axios";

import Weather from "./Weather";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.cca2}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country.capital, country.cca2]);

  return (
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
      {weather.weather && (
        <>
          <h1>Weather in {country.capital}</h1>
          <Weather weather={weather} />
        </>
      )}
    </>
  );
};

export default CountryDetails;
