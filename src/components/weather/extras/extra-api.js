import React from "react";
import Extras from "./extras";

class ExtraApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uv: 0,
      wind: 0,
      winddir: "default",
      vis: 0,
      humidity: 0,
      sunrise: "default",
      sunset: "default",
      aqi_no: 0,
      aqi: "default",
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
        `http://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${search}&days=1&aqi=yes&alerts=no`
      );
      if (resp.ok) {
        const weather = await resp.json();
        const resp3 = await fetch(`https://api.waqi.info/feed/${weather.location.name}/?token=04d5e2b994532c89107760b677b5e2820ee1afc3`);
        const airquality = await resp3.json();
        this.setState({
          uv: weather.current.uv,
          wind: weather.current.wind_kph,
          winddir: weather.current.wind_dir,
          vis: weather.current.vis_km,
          sunrise: weather.forecast.forecastday[0].astro.sunrise,
          sunset: weather.forecast.forecastday[0].astro.sunset,
          humidity: weather.current.humidity,
          aqi: airquality.status,
          aqi_no: airquality.data.aqi,
        });
      } else {
        const resp2 = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${latitude},${longitude}&days=1&aqi=yes&alerts=no`
        );
        const weather = await resp2.json();
        let airquality;
        const resp4 = await fetch(`https://api.waqi.info/feed/${latitude},${longitude}/?token=04d5e2b994532c89107760b677b5e2820ee1afc3`);
        if (resp4.ok) {     
          airquality = await resp4.json();
        } else {
          const resp5 = await fetch(`https://api.waqi.info/feed/here/?token=04d5e2b994532c89107760b677b5e2820ee1afc3`);
          airquality = await resp5.json();
        }
        this.setState({
          uv: weather.current.uv,
          wind: weather.current.wind_kph,
          winddir: weather.current.wind_dir,
          vis: weather.current.vis_km,
          sunrise: weather.forecast.forecastday[0].astro.sunrise,
          sunset: weather.forecast.forecastday[0].astro.sunset,
          humidity: weather.current.humidity,
          aqi: airquality.status,
          aqi_no: airquality.data.aqi,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        <Extras
          uv={this.state.uv}
          wind={this.state.wind}
          winddir={this.state.winddir}
          vis={this.state.vis}
          humidity={this.state.humidity}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          aqi={this.state.aqi}
          aqi_no={this.state.aqi_no}
        />
      </div>
    );
  }
}

export default ExtraApi;
