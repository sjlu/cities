# Cities

[![Circle CI](https://circleci.com/gh/sjlu/cities.svg?style=svg)](https://circleci.com/gh/sjlu/cities)

Cities is an easy to use Node.js library to allow you to lookup a city by it's zipcode or by a set
of GPS coordinates (reverse geocoding).

At the moment, this package only supports US cities only. There are plans to extend this in the
next version.

## Usage

### Webservice

Like any node.js application.

```
npm install
node server.js
```

You can then visit `http://localhost:4000` with the endpoints `/gps/:lat/:lng` or `/zip/:zipcode`
to get locations.

### Install

```
npm install cities --save
```

### Usage

```
var cities = require('cities');
```

#### Lookup by GPS coordinates

```
cities.gps_lookup(lat, lng);
```

#### Lookup by zipcode

```
cities.zip_lookup(zipcode);
```

#### Lookup by state

```
cities.findByState('NJ')
```

#### Find in sentence
This function will analyze a given sentence, extract a city, state or zip code and return an array of results.

```
cities.findInSentence('Traveling to Los Angeles')
cities.findInSentence('Find grocery store 60601')
cities.findInSentence('We got lost in Montana')
```

Sometimes your sentence could match with many results. Just add a limit argument to the function call.

```
cities.findInSentence('Traveling to Los Angeles', 2)
```

### Sample Response

A sample response or object that this module returns looks like this.

    {
        zipcode: "07946",
        state_abbr: "NJ",
        latitude: "40.672823",
        longitude: "-74.52011",
        city: "Millington",
        state: "New Jersey"
    }

When using the ```findInSentence``` function this module will return an array of objects instead. 

## License

MIT.
