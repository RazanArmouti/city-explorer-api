'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;

app.get('/', (req, res) => {

  res.status(200).send('Working');
});


app.get('/weather', (req, res) => {
  
  let searchQuery = req.query.searchQuery ;
  let lat =parseFloat(req.query.lat).toFixed(2);
  let lon =parseFloat(req.query.lon).toFixed(2);
  console.log(searchQuery,lat,lon);
  if (lat&&lon&&searchQuery){
    if(searchQuery.toLowerCase()!=='paris'
    && searchQuery.toLowerCase()!=='seattle'
    && searchQuery.toLowerCase()!=='amman' ){
      res.status(500).send('please provide correct city');
    }
    let result=[];
    weatherData.find(item=>{
      // console.log(item.city_name,item.lat,item.lon);
      if(item.city_name.toLowerCase()===searchQuery.toLowerCase() || item.lat===lat && item.lon===lon ){
        result.push(item);
      }


    });
    console.log(result);
    let city=result[0];
    if (result.length>0){
      let foreCast=city.data.map(item=>{
        return {
          date:item.datetime,
          description:item.weather.description
        };
      });
      res.status(200).json(foreCast);
    }else{
      res.status(500).send('resources not found');
    }

  }else{
    res.status(500).send('please provide correct query params');
  }

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
