'use strict';
const YelpModel = require('../models/yelp.model');
const axios = require('axios');
const Cache=require('../helper/caching');
let cache=new Cache();


const YelpController = async (req, res) => {
  let cityName = req.query.location;
  let lat = req.query.lat;
  let lon = req.query.lon;
  const cityNameYelp = `yelp-${cityName}`;
  let url = `https://api.yelp.com/v3/businesses/search?`;
  // api_key=${process.env.YELP_API_KEY}&searchQuery=${cityName}
  // const yelpURL = ``;
  //   if(cache.data.length>0 && cache.date.cityName===cityName){
  //     res.json({'data':cache,'message':'data retrieved from the cache'});
  if(cache[cityNameYelp]!== undefined){
    res.send(cache[cityNameYelp]);
  }else{

    axios.get(url,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          term: 'restaurants',
          location:cityName,
          latitude:lat,
          longitude:lon
        },
      },
    ).then(YData=> {
      let cleanedData =YData.data.businesses.map(y =>{
        // cache.data=res.data;
        // cache.cityName=cityName;
        // res.json({'data':cache.data,'message':'data is coming from the api'});
        return new YelpModel(y.name,
          y.image_url,
          y.price,
          y.rating,
          y.url);
      });
      console.log(cleanedData);
      cache[cityNameYelp] = cleanedData;
      res.status(200).json(cleanedData);

    }).catch(error => {
      res.send(error);
    });

  }









};

module.exports = YelpController;
