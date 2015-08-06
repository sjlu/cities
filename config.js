var _ = require('lodash');
var dotenv = require('dotenv');

dotenv.load();

var config = {
  USPS_USERNAME: ''
};
config = _.defaults(process.env, config);

module.exports = config;