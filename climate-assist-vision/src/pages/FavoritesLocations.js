import React,{useEffect, useState} from "react";
import "../styles/FavouritesLocations.css";
import "../styles/Dashboard.css";
import "../styles/weather-icons-wind.css";
import "../styles/weather-icons-wind.min.css";
import "../styles/weather-icons.css";
import "../styles/weather-icons.min.css";

function FavouritesLocations() {
    
    const [locations, setLocations] = useState([]);
    
    useEffect (()=> {
        const deviceId = "06046982";
      fetch(`http://localhost:8080/favorites/get?terminalId=${deviceId}`,{
          method:"get",
          headers:{
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
      })
      .then((res) => res.json())
      .then((res) => {
        setLocations(res);
      });
    });
    return (
        <div>
            <div className="titleText">Favorites locations</div>
               {locations.map(location => (
                   <div className="savedLocations">
                   <div className="city">{location.city}, {location.country}</div>
                   <div className="temperature">{location.temperature}°C</div>
                   <i class="wi wi-strong-wind"></i>
                   <div className="wind2">{location.windSpeed}km/h</div>
                   <i class="wi wi-cloudy"></i>
                   <div className="clouds2">{location.clouds}%</div>
                   <i class="wi wi-raindrop"></i>
                   <div className="humidity2">{location.precipitation}%</div>
                   
                   </div>
               ))}
        </div>
    );
}

export default FavouritesLocations;