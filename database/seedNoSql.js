const db = require('./db');

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