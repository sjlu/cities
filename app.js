var express = require('express');
var fs = require('fs');
var app = express();

var locations = JSON.parse(fs.readFileSync('locations.json', 'ascii'));

app.get('/', function (req, res)
{
   res.send({
      "error": "Expecting coordinates. (/:lat/:lng)"
   });
});

app.get('/:lat/:lng', function (req, res)
{
   var lat = req.params.lat;
   var lng = req.params.lng;

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

   res.send(min_location);
});

app.listen(4000);
console.log('http://localhost:4000');
