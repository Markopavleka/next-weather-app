'use client';
import { useEffect, useState } from 'react';

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [searchLocation, setSearchLocation] = useState('vienna');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleLocation = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const locationResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setLocationData(data);
        setLat(data[1].lat);
        setLon(data[1].lon);
      });
    console.log(locationResponse);
    /*     if (!locationResponse) {
      await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        });
    } */
  };

  console.log(weatherData);
  return (
    <div>
      <form onSubmit={handleLocation}>
        <input
          value={searchLocation}
          onChange={(event) => setSearchLocation(event.currentTarget.value)}
        ></input>
        <button type="submit">Search Location</button>
      </form>
    </div>
  );
}
