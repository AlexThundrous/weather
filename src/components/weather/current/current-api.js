import React from "react";
import "../../../container/App.css";
import Current from "./current.js";

class CurrentApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      text: "Mist",
      text2: "Mist",
      icon: "//cdn.weatherapi.com/weather/64x64/night/143.png",
      icon2: "//cdn.weatherapi.com/weather/64x64/night/143.png",
      feelslike: 0,
      humidity: 0,
      name: "default",
      country: "default",
    };
  }

  componentDidMount() {
    this.currentWeather(this.props.search, this.props.latitude, this.props.longitude);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.currentWeather(this.props.search);
    }
  }

  currentWeather = async (search, longitude, latitude) => {
    try {
      const resp = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${search}&days=1&aqi=no&alerts=no`
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
          `http://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`
        );
        const weather = await resp2.json();
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
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
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
