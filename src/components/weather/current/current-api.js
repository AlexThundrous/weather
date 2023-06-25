import React from "react";
import "../../../container/App.css";
import Current from "./current.js";
import { Typography } from "@mui/material";

class CurrentApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 35,
      text: "Mist",
      text2: "Mist",
      icon: "//cdn.weatherapi.com/weather/64x64/night/143.png",
      icon2: "//cdn.weatherapi.com/weather/64x64/night/143.png",
      feelslike: 41,
      humidity: 53,
      name: "Delhi",
      country: "India",
      day: "",
      date: "",
    };
  }

  componentDidMount() {
    this.currentWeather(this.props.search, this.props.latitude, this.props.longitude, this.props.ip);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.currentWeather(this.props.search);
    }
  }

  getCurrentDayAndDate = () => {
    const currentDate = new Date();
    const options = { weekday: "long", month: "long", day: "numeric" };
    const day = currentDate.toLocaleDateString("en-US", options);
    const date = currentDate.toLocaleDateString("en-US");
    this.setState({ day, date });
  };

  currentWeather = async (search, longitude, latitude, ip) => {
    try {
      this.getCurrentDayAndDate();
      const resp = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${search}&days=1&aqi=no&alerts=no`
      );
      if (resp.ok) {
        const weather = await resp.json();
        this.setState({
          temp: weather.current.temp_c,
          feelslike: weather.current.feelslike_c,
          text: weather.current.condition.text,
          icon: weather.current.condition.icon,
          humidity: weather.forecast.forecastday[0].day.daily_chance_of_rain,
          name: weather.location.name,
          country: weather.location.country === "United States of America" ? "U.S.A" : weather.location.country,
          icon2: weather.forecast.forecastday[0].day.condition.icon,
          text2: weather.forecast.forecastday[0].day.condition.text
        });
      } else {
        const resp2 = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`
        );
        const weather = await resp2.json();
        if (weather.location.name !== "Null") {
        this.setState({
          temp: weather.current.temp_c,
          feelslike: weather.current.feelslike_c,
          text: weather.current.condition.text,
          icon: weather.current.condition.icon,
          humidity: weather.forecast.forecastday[0].daily_chance_of_rain,
          name: weather.location.name,
          country: weather.location.country === "United States of America" ? "U.S.A" : weather.location.country,
          icon2: weather.forecast.forecastday[0].day.condition.icon,
          text2: weather.forecast.forecastday[0].day.condition.text
        }); }
        else if (ip !== "NULL"){
          const resp3 = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${ip}&days=1&aqi=no&alerts=no`
          );
          const weather = await resp3.json();
          this.setState({
            temp: weather.current.temp_c,
            feelslike: weather.current.feelslike_c,
            text: weather.current.condition.text,
            icon: weather.current.condition.icon,
            humidity: weather.forecast.forecastday[0].daily_chance_of_rain,
            name: weather.location.name,
            country: weather.location.country === "United States of America" ? "U.S.A" : weather.location.country,
            icon2: weather.forecast.forecastday[0].day.condition.icon,
            text2: weather.forecast.forecastday[0].day.condition.text
          });
        }
        else {
          const resp3 = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=Delhi,India&days=1&aqi=no&alerts=no`
          );
          const weather = await resp3.json();
          this.setState({
            temp: weather.current.temp_c,
            feelslike: weather.current.feelslike_c,
            text: weather.current.condition.text,
            icon: weather.current.condition.icon,
            humidity: weather.forecast.forecastday[0].daily_chance_of_rain,
            name: weather.location.name,
            country: weather.location.country === "United States of America" ? "U.S.A" : weather.location.country,
            icon2: weather.forecast.forecastday[0].day.condition.icon,
            text2: weather.forecast.forecastday[0].day.condition.text
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App-current">
        <div className="current-day-date">
          <Typography><p> {this.state.day} </p></Typography>
        </div>
        <Current
          temperature={this.state.temp}
          feelslike={this.state.feelslike}
          text={this.state.text}
          icon={this.state.icon}
          humidity={this.state.humidity}
          name={this.state.name}
          country={this.state.country}
          icon2 = {this.state.icon2}
          text2 = {this.state.text2}
        />
      </div>
    );
  }
}

export default CurrentApi;
