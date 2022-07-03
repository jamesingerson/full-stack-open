import { useState, useEffect } from "react";
import axios from "axios";

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
  }, []);

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
      {weather.weather !== undefined ? (
        <>
          <h1>Weather in {country.capital}</h1>
          <p>Temperature {weather.main.temp} celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icon depicting weather condition in the area"
          ></img>
          <p>Wind speed {weather.wind.speed} m/s</p>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CountryDetails;
