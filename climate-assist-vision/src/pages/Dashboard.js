import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "../styles/weather-icons-wind.css";
import "../styles/weather-icons-wind.min.css";
import "../styles/weather-icons.css";
import "../styles/weather-icons.min.css";
import {useNavigate} from 'react-router-dom';

function Dashboard() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const[ stateRegister, setStateRegister] = useState({
    isSuccessful: false,
  });
  const [locationDetailes, setLocationDetailes] = useState({
    terminalId:"06046982",
    temperature:"",
    city:"",
    country:"",
    imageUrl:"",
    windSpeed:"",
    precipitaion:"",
    clouds:"",
  });

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}&days=3`,
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
          setLocationDetailes({
            ...locationDetailes,
            temperature: response.current.temp_c,
            city:response.location.name,
            country: response.location.country,
            windSpeed: response.current.wind_kph,
            precipitaion:response.current.humidity,
            clouds:response.current.cloud,
          })
        });
    }
  };

  useEffect(()=>{
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setCoordinates(latitude + "," + longitude);
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
  });

  const fetchCoordinates = () =>{
    fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${coordinates}&days=3`,
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
        console.log(response.forecast);
        setLocationDetailes({
          ...locationDetailes,
          temperature: response.current.temp_c,
          city:response.location.name,
          country: response.location.country,
          windSpeed: response.current.wind_kph,
          precipitaion:response.current.humidity,
          clouds:response.current.cloud,
        })
      });
  };

    const submitHandler = (event) =>{
      event.preventDefault();
      const url = "http://localhost:8080/favorites/";
      fetch(url,{
        method:"post",
        headers:{
          'Accept':"application/json, text/plain, */*",
          "Content-Type":"application/json"
        },
        body: JSON.stringify(locationDetailes),

      })
      .then((res)=>res.json())
      .then((res)=>{
        if(res.city===locationDetailes.city){
          console.log(res);
          setStateRegister({isSuccessful:true});
        }
      });
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

  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  const in2daysTime = new Date();
  in2daysTime.setDate(in2daysTime.getDate() + 2);

 const navigate = useNavigate();
 const handleRoute = () =>{
   navigate('/favorites');
 }

  return (
    <div className="baseCanvas">
      <div className="title">Climate Assist Vision</div>
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
            <div className="uv-index">UV index: {weather.current.uv}</div>

            <div className="other-detailes">
              <i class="wi wi-strong-wind"></i>
              <div className="wind">{weather.current.wind_kph} km/h</div>
              <i class="wi wi-cloudy"></i>
              <div className="clouds">{weather.current.cloud} %</div>
              <i class="wi wi-raindrop"></i>
              <div className="humidity">{weather.current.humidity} %</div>
            </div>

            <div className="forecasts-detailes">
              <div className="detailes1">
                <div className="dateTime"> {dateBuilder(nextDay)} </div>
                <div className="temp">
                  {" "}
                  Min. Temp: {weather.forecast.forecastday[1].day.mintemp_c}°C
                  Max. Temp: {weather.forecast.forecastday[1].day.maxtemp_c}°C
                </div>
                <div className="condition">
                  Condition:{" "}
                  {weather.forecast.forecastday[1].day.condition.text}
                </div>
              </div>
              <div className="detailes2">
                <div className="dateTime"> {dateBuilder(in2daysTime)} </div>
                <div className="temp">
                  {" "}
                  Min. Temp: {weather.forecast.forecastday[2].day.mintemp_c}°C
                  Max. Temp: {weather.forecast.forecastday[2].day.maxtemp_c}°C
                </div>
                <div className="condition">
                  Condition:{" "}
                  {weather.forecast.forecastday[2].day.condition.text}
                </div>
              </div>
            </div>
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
        <button className="addButton" type="submit" onClick={submitHandler}> Add to favorites </button>
        <button className="favourites-locations" onClick={handleRoute}>Favorites locations</button>
      </div>
    </div>
  );
}

export default Dashboard;
