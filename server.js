var cities = require('./app');
var express = require('express');
var app = express();

app.get('/', function (req, res)
{
   res.send({
      "error": "Expecting input. (/zip/:zipcode) (/gps/:lat/:lng)"
   });
});

app.get('/zip/:zip', function (req, res)
{
   var zip = req.params.zip;

   var response = cities.zip_lookup(zip);
   if (!response)
      return res.send({error:'Zip code is not valid.'});

   return res.send(response);
});

app.get('/gps/:lat/:lng', function (req, res)
{
   var lat = req.params.lat;
   var lng = req.params.lng;

   return res.send(cities.gps_lookup(lat, lng));
});

app.listen(4000);
console.log('http://localhost:4000');
