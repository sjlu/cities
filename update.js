var Promise = require('bluebird')
var request = Promise.promisifyAll(require('request'))
var xml2js = require('xml2js')
var _ = require('lodash')
var config = require('./config');
var locations = require('./locations');
var fs = Promise.promisifyAll(require('fs'))

var parseXmlString = Promise.promisify(xml2js.parseString, xml2js);

var xmlBuilder = new xml2js.Builder({
  renderOpts: {
    pretty: false
  },
  headless: true
})

locations = _.indexBy(locations, "zipcode")

var requestZipcode = function(zipcode) {

  var req = {
    CityStateLookupRequest: {
      $: {
        USERID: config.USPS_USERNAME
      },
      ZipCode: {
        $: {
          ID: 0
        },
        Zip5: zipcode
      }
    }
  }

  var xmlReq = xmlBuilder.buildObject(req);

  var opts = {
    url: 'http://production.shippingapis.com/ShippingAPI.dll',
    qs: {
      API: 'CityStateLookup',
      xml: xmlReq
    }
  }

  return Promise.resolve()
    .bind({})
    .then(function() {
      return request.getAsync(opts)
    })
    .spread(function(response, body) {
      return parseXmlString(body);
    })
    .then(function(data) {
      var data = _.first(data.CityStateLookupResponse.ZipCode)
      if (data.City && data.State) {
        return {
          zipcode: data.Zip5[0],
          city: data.City[0],
          state: data.State[0]
        }
      }
    })

}

var capitalize = function(city) {
  city = city.toLowerCase().split(" ")
  city = _.map(city, _.capitalize).join(" ")
  return city
}

var save = function() {
  var newLocations = _.values(locations)
  return fs.writeFileAsync('locations.json', JSON.stringify(newLocations))
}

var hasChanged = function(zipcode) {
  return requestZipcode(zipcode)
    .then(function(data) {
      if (!data) {
        return
      }
      var prev = locations[data.zipcode]
      var prevCity = prev.city.toLowerCase()
      var newCity = data.city.toLowerCase()
      if (prevCity !== newCity) {
        var newCityFormatted = capitalize(data.city)
        console.log(zipcode + ": " + prev.city + " → " + newCityFormatted)
        locations[data.zipcode].city = newCityFormatted
        return save()
      }
    })
}

Promise
  .resolve(_.pluck(locations, "zipcode"))
  .each(function(zipcode) {
    zipcode = _.padLeft(zipcode, 5, 0)
    return hasChanged(zipcode)
  })