import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";


function Dashboard() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
 
  const search = (evt) => {
    if (evt.key === "Enter") {
      const url = `https://aerisweather1.p.rapidapi.com/observations/${query}`;
  fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "aerisweather1.p.rapidapi.com",
		"x-rapidapi-key": "659873ca62msh3d98a1c00ba332ap158787jsn182defbd3e10"
	}
})
.then((res)=> res.json())
.then((response) => {
	console.log(response);
  setWeather(response);
  setQuery("");
});
}
};

  const dateBuilder = (dt) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octomber",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[dt.getDay()];
    let date = dt.getDate();
    let month = months[dt.getMonth()];
    let year = dt.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="baseCanvas">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search location..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        ></input>
      </div>
      {(typeof weather.response != "undefined") ? (
      <div>
      <div className="location-box">
        <div className="location">{weather.response.place.name}, {weather.response.place.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>

      <div className="weather-box">
        <div className="temperature">{Math.round(weather.response.ob.tempC)}°C</div>
        <div className="weather">{weather.response.ob.weather}</div>
      </div>
      </div>
      ) : ('')}
    </div>
  );
}

export default Dashboard;
