var assert = require("assert");
var cities = require("../app");

describe('gps_lookup()', function() {
  it('should give me 07946 based on exact location', function() {
    var hometown = cities.gps_lookup(40.672823, -74.52011);
    assert.equal(07946, hometown.zipcode);
  });
});

describe('zip_lookup()', function() {
  it('should give me 07946 based on zip code', function() {
    var hometown = cities.zip_lookup(07946);
    assert.equal(07946, hometown.zipcode);
  });
});

describe('findByState', function() {
  it('should give me a list of zipcodes', function() {
    var citiesFromZips = cities.findByState('NJ');
    assert.equal(Array.isArray(citiesFromZips), true);
    assert.equal(citiesFromZips.length > 0, true);
  })
})

describe('findByCityAndState', function() {
  it('should find me a city', function() {
    var place = cities.findByCityAndState('millington', 'nj');
    assert.equal(place.city, 'Millington')
    assert.equal(place.state, 'New Jersey')
  })
})