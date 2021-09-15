'use strict';
const MovieModel = require('../models/Movie.model');
const axios = require('axios');


const MovieController = async (req, res) => {
  let country = req.query.country;
  let url = `https://api.themoviedb.org/3/movie/76341?api_key=${process.env.Movie_API_KEY}&query=${country}`;

  axios.get(url).then((MovieData) => {

    let cleanedData = MovieData.data.data.map(movie => {
      
      return new MovieModel(movie.original_title, movie.overview, movie.vote_average, movie.vote_count, movie.poster_path, movie.popularity, movie.release_date);

    });
    console.log(cleanedData);
    res.status(200).json(cleanedData);


  });



};


module.exports = MovieController;
