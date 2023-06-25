import React from 'react';
import Forecast from './forecast';

class ForecastAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
    };
  }

  componentDidMount() {
    this.currentForecast(this.props.search, this.props.latitude, this.props.longitude, this.props.ip);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.currentForecast(this.props.search);
    }
  }

  currentForecast = async (search, latitude, longitude, ip) => {
    try {
      const resp = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${search}&days=7&aqi=no&alerts=no`
      );
      if (resp.ok) {
        const weather = await resp.json();
        this.setState({
          forecast: weather.forecast.forecastday
        });
      } else {
        const resp2 = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`
        );
        if (resp2.ok) {
        const weather = await resp2.json();
        this.setState({
          forecast: weather.forecast.forecastday
        }); }
        else {
          const resp3 = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=820087a8ca4840f2b6674100232206&q=${ip}&days=7&aqi=no&alerts=no`)
          const weather = await resp3.json();
        this.setState({
          forecast: weather.forecast.forecastday
        }); 
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        <Forecast
          forecast={this.state.forecast}
        />
      </div>
    );
  }
}

export default ForecastAPI;
