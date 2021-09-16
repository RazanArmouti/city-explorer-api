'use strict';
const express=require('express');
const server=express();
const cors=require('cors');
require('dotenv').config();
server.use(cors());
const PORT=process.env.PORT;
const WeatherController=require('./controllers/Weather.controller');
const MovieController=require('./controllers/Movie.controller');
const YelpController=require('./controllers/yelp.controller');

server.get('/',(req,res)=>{
  res.status(200).json({'message':'I\'m working'});
});


if(server.get('/weather',WeatherController)){
  console.log('Status:200 -Weather data working fine');
}else{
  console.log('Status:500 - data not retrieve');
}
//*************************************************** */

if(server.get('/movies',MovieController)){
  console.log('Status:200 - Movie data working fine');
}else{
  console.log('Status:500 - data not retrieve');
}

//****************************************************** */
if(server.get('/yelp',YelpController)){
  console.log('Status:200 - Movie data working fine');
}else{
  console.log('Status:500 - data not retrieve');
}

// server.get('*', (req, res) => {
//   try {} catch (error) {
//     res.status(500).send(error);
//   }
// });

server.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`);
});


