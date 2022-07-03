const Weather = ({ weather }) => {
  return (
    <>
      <p>Temperature {weather.main.temp} celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Icon depicting weather condition in the area"
      ></img>
      <p>Wind speed {weather.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
