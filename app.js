var fs = require('fs');
var locations = require('./locations');
var haversine = require('haversine');
var _ = require('lodash');

var find = exports.find = function(key, value) {
  for (var i = 0; i < locations.length; i++) {
    if (locations[i] && locations[i][key] == value) {
      return locations[i];
    }
  }
}

var findAll = exports.findAll = function(key, value) {
  return _.filter(locations, function(location) {
    return location[key] === value;
  });
}

exports.zip_lookup = exports.zipLookup = function(zipcode) {
  zipcode = _.padLeft(zipcode, 5, 0);
  return find("zipcode", zipcode);
};

exports.gps_lookup = exports.gpsLookup = function(latitude, longitude) {
  var minDistance = Infinity; // simulate infinity
  var minLocation = {};

  var start = {
    latitude: latitude,
    longitude: longitude
  }

  for (var i = 0; i < locations.length; i++) {
    var distance = haversine(start, locations[i]);

    if (distance < minDistance) {
      minLocation = locations[i];
      minDistance = distance;
    }
  }

  minLocation.distance = minDistance;
  return minLocation;
};

exports.findByState = function(state) {
  state = state.toUpperCase()
  return findAll("state_abbr", state)
}