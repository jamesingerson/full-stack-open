import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Country from "./components/Country";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setNewFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const countriesToDisplay =
    filter === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {countriesToDisplay.length === 1 ? (
        <CountryDetails country={countriesToDisplay[0]} />
      ) : countriesToDisplay.length <= 10 ? (
        countriesToDisplay.map((country) => (
          <Country key={country.cca3} country={country} />
        ))
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
