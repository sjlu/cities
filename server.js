var cities = require('./app');
var express = require('express');
var app = express();

app.get('/', function (req, res)
{
   res.setHeader('Content-Type', 'application/json');
   res.setHeader('Cache-Control', 'max-age=21600');
   res.setHeader("Access-Control-Allow-Origin", "*");

   res.end(JSON.stringify({
      "error": "Expecting input. (/zip/:zipcode) (/gps/:lat/:lng)"
   }));
});

app.get('/zip/:zip', function (req, res)
{
   res.setHeader('Content-Type', 'application/json');
   res.setHeader('Cache-Control', 'max-age=21600');
   res.setHeader("Access-Control-Allow-Origin", "*");

   var zip = req.params.zip;

   var response = cities.zip_lookup(zip);
   if (!response)
      return res.end(JSON.stringify({error:'Zip code is not valid.'}));

   return res.end(JSON.stringify(response));
});

app.get('/gps/:lat/:lng', function (req, res)
{
   res.setHeader('Content-Type', 'application/json');
   res.setHeader('Cache-Control', 'max-age=21600');
   res.setHeader("Access-Control-Allow-Origin", "*");

   var lat = req.params.lat;
   var lng = req.params.lng;

   return res.end(JSON.stringify(cities.gps_lookup(lat, lng)));
});

app.listen(4000);
console.log('http://localhost:4000');
