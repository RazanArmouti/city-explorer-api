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
  
  let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
  console.log(url);
  let axiosResponse= await axios.get(url);
  let weatherData=axiosResponse.data;
  console.log('Weather'+ weatherData);
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
//*************************************************** */
let handleMovie= async (req,res)=>{
  let country =req.query.country;
  let url=`https://api.themoviedb.org/3/movie/76341?api_key=${process.env.Movie_API_KEY}&production_countries.name=${country}`;
  
  console.log(url);
  let axiosMovieResponse= await axios.get(url);
  let MovieData=axiosMovieResponse.data;
  console.log('Movie'+ MovieData);
  let cleanedData=MovieData.data.map(e=>{
    return new Movie(e.original_title,e.overview,e.vote_average,e.vote_count,e.poster_path,e.popularity,e.release_date);
  });
  res.status(200).json(cleanedData);
};
if(app.get('/movies',handleMovie)){
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

// MovieModel
class Movie{
  constructor(title,overview,average_votes,total_votes,image_url,popularity,released_on){
    this.title=title;
    this.overview=overview;
    this.average_votes=average_votes;
    this.total_votes=total_votes;
    this.image_url=image_url;
    this.popularity=popularity;
    this.released_on=released_on;

  }
}
