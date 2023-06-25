import React from "react";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import "./current.css";
import { Typography } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import rainGif from './icons8-rain.gif'; // Import the GIF file

const Current = ({ temperature, feelslike, text, icon, humidity, name, country, text2, icon2 }) => {
  // Replace the icon URL with a larger size (128x128)
  const iconUrl = icon.replace("64x64", "128x128");

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="current">
        <Container maxWidth="sm">
          <div className="basic">
            <span className="icon">
              <img src={iconUrl} alt="icon" className="weather-icon" />
              <Typography><strong>{text}</strong></Typography>
            </span>
            <br></br>
            <div className="temperature">
              <span className="degree">
                <Typography className="temperature-value" fontSize={80}>{temperature}°</Typography>
                <Typography className="unit" fontSize={30} fontWeight={30}> C </Typography>
              </span>
              <p className="Feels-like" fontSize={20}> Feels like <strong>&nbsp; {feelslike} </strong> </p>
            </div>
          </div>
          <br />
          <br />
          <hr></hr>
          <br></br>
          <div className="others">
            <div className="condition"> <img src={icon2} alt="icon" /> {text2} </div>
            <br></br>
            <div className="humidity"> <img width="48" height="48" src={rainGif} alt="hygrometer" /> &nbsp; <strong> Rain - {humidity}%</strong></div>
          </div>
        </Container>
        <Typography><h1> {name}, {country} </h1> </Typography>
      </div>
    </React.Fragment>
  );
}

export default Current;
