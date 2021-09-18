'use strict';
const WeatherModel = require('../models/Weather.model');
// const WeatherData = require('../data/Weather.json');
const axios = require('axios');


const WeatherController = async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;


  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  axios.get(url).then((weatherData) => {
    let cleanedData =weatherData.data.data.map(day=>{
      return new WeatherModel(day.datetime, day.weather.description);

    });
    console.log(cleanedData);
    res.status(200).json(cleanedData);

  }).catch(error => {
    res.send(error);
  });



};


module.exports = WeatherController;
