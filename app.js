var express = require('express');
var fs = require('fs');
var app = express();

var locations = JSON.parse(fs.readFileSync('locations.json', 'ascii'));

exports.zip_lookup = function(zip)
{
   for (var i = 0; i < locations.length; i++)
   {
      if (locations[i].zipcode == zip)
         return locations[i];
   }
}

exports.gps_lookup = function(lat, lng)
{
   var min_distance = 9999999999; // simulate infinity
   var min_location = {};

   for (var i = 0; i < locations.length; i++)
   {
      var distance = Math.sqrt(
         Math.pow(lat - locations[i].latitude, 2) + Math.pow(lng - locations[i].longitude, 2)
      );

      if (distance < min_distance)
      {
         min_location = locations[i];
         min_distance = distance;
      }
   }

   return min_location;
}

app.get('/', function (req, res)
{
   res.send({
      "error": "Expecting coordinates. (/:lat/:lng)"
   });
});

app.get('/zip/:zip', function (req, res)
{
   var zip = req.params.zip;

   res.send(exports.zip_lookup(zip));
});

app.get('/gps/:lat/:lng', function (req, res)
{
   var lat = req.params.lat;
   var lng = req.params.lng;

   res.send(exports.gps_lookup(lat, lng));
});

app.listen(4000);
console.log('http://localhost:4000');
