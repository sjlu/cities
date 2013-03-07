# Cities

Cities is an easy to use Node.js library to allow you to lookup a city by it's zipcode or by a set of GPS coordinates.

## Usage

### Webservice

Like any node.js application.

    npm install
    node server.js

You can then visit `http://localhost:4000` with the endpoints `/gps/:lat/:lng` or `/zip/:zipcode` to get locations.

### Module

Easy. Require `"cities": "1.x"` in `package.json`, then do `npm install`.

    var cities = require('cities');
    cities.gps_lookup(lat, lng);
    cities.zip_lookup(zipcode);

## Sample

A sample response or object that this module returns looks like this.

    {
        zipcode: "07946",
        state_abbr: "NJ",
        latitude: "40.672823",
        longitude: "-74.52011",
        city: "Millington",
        state: "New Jersey"
    }

## License

MIT.
