const mongoose = require('mongoose');
const db = require('./indexNoSql');
const seedGenerator = require('./seedGenerator.js');

db.on('error', function (err) {
  console.log('Mongo connection error', err);
});
db.once('open', function () {
  console.log('Connected to Mongo');
  
  let products = new mongoose.Schema({
    id: String,
    type: String,
    name: String,
    img_url: String,
    short_desc: String,
    long_desc: String,
    category: String,
    price: Number,
    rating: Number,
    review_count: Number,
    details: String,
    completeLook: [{
      id1: String,
      type1: String,
      name1: String,
      img_url1: String,
      price1: Number,
      id2: String,
      type2: String,
      name2: String,
      img_url2: String,
      price2: Number,
      id3: String,
      type3: String,
      name3: String,
      img_url3: String,
      price3: Number
    }]
  });

  let shares = new mongoose.Schema({
    id: Number,
    user: String,
    img: String
  });

  let Product = mongoose.model('Product', products);
  let Share = mongoose.model('Share', shares);
  
  const executeSeed = (remaining, position, callback = () => console.log('Database seeded!')) => {
    let chunkSize = 800; //must be multiple of 4
    let chunk = Math.min(remaining, chunkSize);
    let data = seedGenerator(chunk, position, false);
    return Product.insertMany(data.products).then(() => {
      return Share.insertMany(data.shares);
    }).then(() => {
      let newRemaining = remaining - chunk;
      let newPosition = position + chunkSize / 4;
      if (newRemaining === 0) {
        db.close();
        callback();
      } else {
        executeSeed(newRemaining, newPosition, callback);
      }
    });
  };
  executeSeed(10000000, 1);

});

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