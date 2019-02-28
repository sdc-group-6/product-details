const config = require('../knexfile.js');
const configDev = config.development;
const configTest = config.test;
const knexDev = require('knex')(configDev);
const knexTest = require('knex')(configTest);
const seedGenerator = require('./seedGenerator.js');

const executeSeed = (remaining, position, env) => {
  let chunkSize = 400; //must be multiple of 4
  let chunk = Math.min(remaining, chunkSize);
  let data = seedGenerator(chunk, position, true);
  return env.batchInsert('products', data.products).then(() => {
    return env.batchInsert('looks', data.looks);
  }).then(() => {
    return env.batchInsert('shares', data.shares);
  }).then(() => {
    let newRemaining = remaining - chunk;
    let newPosition = position + chunkSize / 4;
    if (newRemaining === 0) {
      console.log('database seed complete!');
      env.destroy();
      return;
    } else {
      executeSeed(newRemaining, newPosition, env);
    }
  });
};

executeSeed(10000, 1, knexTest);

