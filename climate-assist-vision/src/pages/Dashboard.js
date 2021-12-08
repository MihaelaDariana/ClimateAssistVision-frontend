import React from "react";
import "../styles/Dashboard.css";

function Dashboard() {
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
        ></input>
      </div>
      <div className="location-box">
        <div className="location">Baia Mare</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>

      <div className="weather-box">
        <div className="temperature">15 C</div>
        <div className="weather">Sunny</div>
      </div>
    </div>
  );
}

export default Dashboard;
