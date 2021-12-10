import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";

function Dashboard() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key":
            "659873ca62msh3d98a1c00ba332ap158787jsn182defbd3e10",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setWeather(response);
          setQuery("");
        });
    }
  };

  const fetchCoordinates = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject("Browser does not support geolocation API");
      }

      navigator.geolocation.getCurrentPosition(
        (location) => {
          resolve(location.coords);
          console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          console.log(latitude);
          console.log(longitude);
          const coordinates = latitude + "," + longitude;
          fetch(
            `https://weatherapi-com.p.rapidapi.com/current.json?q=${coordinates}`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                "x-rapidapi-key":
                  "659873ca62msh3d98a1c00ba332ap158787jsn182defbd3e10",
              },
            }
          )
            .then((res) => res.json())
            .then((response) => {
              console.log(response);
              setWeather(response);
              setQuery("");
            });
        },
        (error) => {
          switch (error.code) {
            case "PERMISSION_DENIED":
              return reject("Permission denied to get location");
            case "TIMEOUT":
              return reject("Timeout waiting for user response");
            case "POSITION_UNAVAILABLE":
            default:
              return reject("Cannot detect user location");
          }
        }
      );
    });

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

      {typeof weather.location != "undefined" ? (
        <div>
          {weather.current.temp_c > 16 ? (
            <div className="warm-backgorund"></div>
          ) : (
            <div className="cold-backgorund"></div>
          )}
          <div className="location-box">
            <div className="location">
              {weather.location.name}, {weather.location.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temperature">
              {Math.round(weather.current.temp_c)}°C
            </div>
            <div className="weather">{weather.current.condition.text}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="button-container">
        <button className="current-location" onClick={fetchCoordinates}>
          {" "}
          Weather on current location{" "}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
