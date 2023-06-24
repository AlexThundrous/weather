import React from 'react';
import "./forecast.css"
import { Typography } from '@mui/material';

const ForeCastCard = ({ max_temp, min_temp, icon, date }) => {
  const day = new Date(date).toLocaleString('en-US', { weekday: 'short' });
  const diff = parseInt(max_temp - min_temp);
  return (
    <div className="forecast-card">
      <Typography> <strong> {day.slice(0, 3)} </strong></Typography>
      <Typography> <img src={icon} alt="icon" /> </Typography>
      <Typography>
        <strong>{max_temp}°</strong> -<span className="diff">{diff}°</span>
      </Typography>
    </div>
  );
}

export default ForeCastCard;
