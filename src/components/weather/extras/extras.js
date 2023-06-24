import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import './extras.css';
import UVmeter from './uvmeter'
import gif from './icons8-compass.gif';
import gif2 from './icons8-visibility.gif';

const Extras = ({ uv, wind, sunrise, sunset, humidity, vis, winddir, aqi, aqi_no }) => {
  const isMobile = window.innerWidth <= 518;
  return (
    <div className="extras">
      <h3>Today's Highlight</h3>
      <Grid container spacing={isMobile? 3 : 5} className="cards">
        <Grid item xs={isMobile? 6 : 4}>
          <Card className="UV">
            <span>UV Index</span>
            <UVmeter percentage ={uv}/>
          </Card>
        </Grid>
        <Grid item xs={isMobile? 6 : 4}>
          <Card className="Wind">
            <span>Wind Status</span>
            <div className = "wind"><h1>{wind}</h1><h4>km/h</h4></div>
            <div className='winddir'><img src={gif} alt = "compass"/> &nbsp; {winddir} </div>
          </Card>
        </Grid>
        <Grid item xs={isMobile? 6 : 4}>
          <Card className="astro">
            <span>Sunrise & Sunset</span>
            <div className = "sun">
            <div className = "sunrise"><img width="35" height="35" src="https://img.icons8.com/color/48/sunrise.png" alt="sunrise"/>&nbsp; &nbsp; <h4> {sunrise}</h4></div>
            <div className = "sunset"> <img width="35" height="35" src="https://img.icons8.com/color/48/sunset.png" alt="sunset--v1"/> &nbsp; &nbsp; <h4> {sunset}</h4></div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={isMobile? 6 : 4}>
          <Card className="Humidity">
            <span>Humidity</span>
            <div className='humid'><h4>%</h4><h1>{humidity}</h1>&nbsp; &nbsp;<img width="50" height="50" src="https://img.icons8.com/dusk/64/humidity.png" alt="humidity"/></div>
          </Card>
        </Grid>
        <Grid item xs={isMobile? 6 : 4}>
          <Card className="Visibility">
            <span>Visibility</span>
            <div className = "vis"><img src={gif2} alt = "visibility" /> &nbsp; &nbsp; <h1>{vis}</h1><h4>km</h4></div>
          </Card>
        </Grid>
        <Grid item xs={isMobile? 6 : 4}>
          <Card className="AQI">
            <span>Air Quality</span>
           <div className = "aqi"> <img width="48" height="48" src="https://img.icons8.com/color/48/air-quality.png" alt="air-quality"/> &nbsp; &nbsp; <h1>{aqi_no}</h1> </div>
            <h4> {aqi} </h4>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Extras;
