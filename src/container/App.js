import React, { useState, useEffect } from "react";
import "./App.css";
import CurrentApi from "../components/weather/current/current-api.js";
import SearchApi from "../components/search/search-api.js";
import ForecastAPI from "../components/weather/forecast/forecast-api.js";
import ExtraApi from "../components/weather/extras/extra-api";
import axios from "axios";

const App = () => {
  const [searchfield, setSearchfield] = useState("");
  const [search, setSearch] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ip, setIP] = useState("");

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchChange = (value) => {
    setSearchfield(value);
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setSearchfield(`${position.coords.latitude},${position.coords.longitude}`);
        await getData(); //get IP prehand since it takes a bit of time to get IP
        setLoading(false);
      } catch (error) {
        await getData();
        setLoading(false);
      }
    };

    const getData = async () => {
      const res = await axios.get("https://api.ipify.org/?format=json");
      setIP(res.data.ip);
    };

    getLocation();
  }, []);

  
  return (
    <div className="App">
      <div className="sideBar">
        <SearchApi
          searchfield={search}
          searchChange={handleSearchChange}
          search={searchfield}
          searchClick={(event) => onSearchChange(event)}
        />
        {!loading && (
          <CurrentApi
            search={searchfield}
            latitude={latitude}
            longitude={longitude}
            ip = {ip}
          />
        )}
      </div>
      <div className="main">
      <ForecastAPI search={searchfield}
            latitude={latitude}
            longitude={longitude}
            ip = {ip}
            />
            <ExtraApi 
            search={searchfield}
            latitude={latitude}
            longitude={longitude}
            ip = {ip}/>   
        </div> 
    </div>
  );
};

export default App;


