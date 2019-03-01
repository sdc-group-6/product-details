const mongoose = require('mongoose');

let products = new mongoose.Schema({
  id: { type: String, index: true },
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
  id: { type: Number, default: 0 },
  user: String,
  img: String
});

module.exports.Product = mongoose.model('Product', products);
module.exports.Share = mongoose.model('Share', shares);