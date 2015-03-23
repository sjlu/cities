var locations = require('./locations');
var filter = require('lodash.filter');
var padLeft = require('lodash.padleft');

var R = 6371;
var haversine = function(lat1, lon1, lat2, lon2)
{
   var dLat = (lat2-lat1) * (Math.PI / 180);
   var dLon = (lon2-lon1) * (Math.PI / 180);
   lat1 = lat1 * (Math.PI / 180);
   lat2 = lat2 * (Math.PI / 180);

   var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   var d = R * c;

   return d;
};

var pad = function(num) {
 return padLeft(String(num), 5, 0)
}

var findLoc = exports.find = function(query) {
  var results = filter(locations, query);
  return results.length === 1? results[0] : results
}

exports.zip_lookup = function(zip)
{
  return findLoc({zipcode: pad(zip)});
};

exports.gps_lookup = function(lat, lng)
{
   var min_distance = 9999999999; // simulate infinity
   var min_location = {};

   for (var i = 0; i < locations.length; i++)
   {
      var distance = haversine(lat, lng, locations[i].latitude, locations[i].longitude);

      if (distance < min_distance)
      {
         min_location = locations[i];
         min_distance = distance;
      }
   }

   min_location.distance = min_distance;
   return min_location;
};
