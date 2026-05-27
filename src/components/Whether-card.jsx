import { useState } from "react";
import "../styles/Weather-Card.css";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) return;

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      // console.log("API KEY:", API_KEY);

      const data = await response.json();


      // ❌ API error handling
      if (data.cod !== 200) {
        alert(data.message);
        setWeather(null);
        return;
      }

      setWeather(data);
    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      
      {weather && weather.main && (
        <div>
          <h2>Weather information for {weather.name}</h2>

          <p>Temperature: {weather.main.temp}°C</p>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>Wind speed: {weather.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;