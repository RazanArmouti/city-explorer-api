'use strict';
const YelpModel = require('../models/yelp.model');
const axios = require('axios');
const Cache=require('../helper/caching');
let cache=new Cache();


const YelpController = async (req, res) => {
  let cityName = req.query.searchQuery;
  const cityNameYelp = `yelp-${cityName}`;
  let url = `https://api.yelp.com/v3/businesses/search?api_key=${process.env.YELP_API_KEY}&searchQuery=${cityName}`;
  // const yelpURL = ``;
  //   if(cache.data.length>0 && cache.date.cityName===cityName){
  //     res.json({'data':cache,'message':'data retrieved from the cache'});
  if(cache[cityNameYelp]!== undefined){
    res.send(cache[cityNameYelp]);
  }else{

    axios.get(url).then((YelpData) => {
      let cleanedData = YelpData.data.results.map(yelp =>{
        // cache.data=res.data;
        // cache.cityName=cityName;
        // res.json({'data':cache.data,'message':'data is coming from the api'});
        return new YelpModel(yelp.name,
          yelp.image_url,
          yelp.price,
          yelp.rating,
          yelp.url);
      });
      console.log(cleanedData);
      cache[cityNameYelp] = cleanedData;
      res.status(200).json(cleanedData);

    });

  }









};

module.exports = YelpController;
