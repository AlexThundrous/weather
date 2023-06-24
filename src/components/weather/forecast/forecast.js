import React from 'react';
import ForeCastCard from './forecast-card';
import { Typography } from '@mui/material';

const Forecast = ({ forecast }) => {
  console.log(forecast); // Check the value of forecast

  if (!forecast || forecast.length === 0) {
    return null;
  }

  const CardArray = forecast.map((item, i) => {
    console.log(item); // Check the value of each item in the forecast array

    return (
      <ForeCastCard
        key={i}
        max_temp={item.day.maxtemp_c}
        min_temp={item.day.mintemp_c}
        icon={item.day.condition.icon}
        date = {item.date}
      />
    );
  });

  return (
        <div className = "week"> 
          <Typography variant="h6" style={{ color: 'black' }}>  <strong> Weekly Forecast Data </strong> </Typography>
        <div className = "forecast">            
           {CardArray}
        </div> </div>
        )
};

export default Forecast;
