'use strict';
const express=require('express');
const app=express();
const cors=require('cors');
const axios=require('axios');
require('dotenv').config();
app.use(cors());
const PORT=process.env.PORT;

app.get('/',(req,res)=>{
  res.status(200).json({'message':'I\'m working'});
});

let handleWeather= async (req,res)=>{
  let lat =req.query.lat;
  let lon =req.query.lon;
  console.log('hi');
  let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
  console.log(url);
  let axiosResponse= await axios.get(url);
  let weatherData=axiosResponse.data;
  console.log('razan'+ weatherData);
  let cleanedData=weatherData.data.map(item=>{
    return new ForeCast(item.datetime,item.weather.description);
  });
  res.status(200).json(cleanedData);
};
if(app.get('/weather',handleWeather)){
  console.log('Status:200 - working fine');
}
else{
  console.log('Status:500 - data not retrieve');
}


app.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`);
});

// Model
class ForeCast{
  constructor(date,description){
    this.date=date;
    this.description=description;
  }
}
