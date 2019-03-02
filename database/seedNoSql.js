const mongoose = require('mongoose');
const db = require('./indexNoSql');
const seedGenerator = require('./seedGenerator.js');
const Product = require('./modelNoSql').Product;
const Share = require('./modelNoSql').Share;

const seedNoSql = (remaining, position, callback = () => console.log('MongoDB seeded!')) => {

  db.on('error', function (err) {
    console.log('Mongo connection error', err);
  });
  db.once('open', function () {
    console.log('Connected to Mongo');
    
    const executeSeed = (remaining, position, callback) => {
      console.log('executeSeed running');
      let chunkSize = 800; //must be multiple of 4
      let chunk = Math.min(remaining, chunkSize);
      let data = seedGenerator(chunk, position, false);
      return Product.insertMany(data.products).then(() => {
        return Share.insertMany(data.shares);
      }).then(() => {
        let newRemaining = remaining - chunk;
        let newPosition = position + chunkSize / 4;
        if (newRemaining === 0) {
          // db.close(() => callback());
          callback();
        } else {
          executeSeed(newRemaining, newPosition, callback);
        }
      });
    };
    executeSeed(remaining, position, callback);
  });

};

module.exports = seedNoSql;

// seedNoSql(10000000, 1);



/*
table.string('id', 15).primary();
table.string('type', 8);
table.string('name', 40);
table.string('img_url', 100);
table.string('short_desc', 100);
table.string('long_desc', 600);
table.string('category', 15);
table.integer('price');
table.decimal('rating', 3, 1);
table.integer('review_count');
table.string('details', 200);
*/