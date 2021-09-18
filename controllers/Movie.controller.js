'use strict';
const MovieModel = require('../models/Movie.model');
const axios = require('axios');
const Cache=require('../helper/caching');
let cache=new Cache();


const MovieController = async (req, res) => {
  let cityName = req.query.query;
  const cityNameMovies = `movies-${cityName}`;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.Movie_API_KEY}&query=${cityName}`;

  if(cache[cityNameMovies]!== undefined){
    res.send(cache[cityNameMovies]);
  // if(cache.data.length>0 && cache.date.cityName===cityName){
  //   res.json({'data':cache,'message':'data retrieved from the cache'});
  }else{

    axios.get(url).then((MovieData) => {

      let cleanedData = MovieData.data.results.map(movie =>{
        return new MovieModel(movie.title,
          movie.overview,
          movie.vote_average,
          movie.vote_count,
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          //
          movie.popularity,
          movie.release_date);

      });

      console.log(cleanedData);
      cache[cityNameMovies] = cleanedData;
      res.status(200).json(cleanedData);
    }).catch(error => {
      res.send(error);
    });
  }
};

module.exports = MovieController;
