const config = require('../knexfile.js');

let configEnv;
if (process.env.NODE_ENV === 'test') {
  configEnv = config.test;
} else {
  configEnv = config.development;
}

var knex = require('knex')(configEnv);

module.exports = knex;