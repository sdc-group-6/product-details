const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const db = require('../database/indexNoSql.js');
const Product = require('../database/modelNoSql').Product;
const Share = require('../database/modelNoSql').Share;

app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors({
  'origin': '*',
}));

let randomImg = () => {
  let randomMax = process.env.NODE_ENV === 'test' ? 200 : 2500000;
  var arr = [];
  for (var i = 0; i < 18; i++) {
    arr.push('shoe' + Math.ceil(Math.random() * randomMax));
  }
  return arr;
};

app.get('/shoes', (req, res) => {
  let queryStartTime = new Date();
  let shoes = randomImg();
  Product.find().where('id').in(shoes).exec((err, shoes) => {
    if (err) {
      console.log(err);
    } else {
      res.json(shoes);
      console.log(`Shoes SQL Query Time: ${new Date() - queryStartTime}ms for 18 randomized shoes`);
    }
  });
});

app.get('/shoes/:shoeId', (req, res) => {
  let queryStartTime = new Date();
  let id = req.params.shoeId;
  Product.findOne({ id: id }, (err, shoe) => {
    if (err) {
      console.log(err);
    } else {
      res.json(shoe);
      console.log(`Product Details SQL Query Time: ${new Date() - queryStartTime}ms for product id: ${id}`);
    }
  });
});

app.get('/looks/:id', (req, res) => {
  let queryStartTime = new Date();
  let id = req.params.id;
  Product.findOne({ id: id }, (err, shoe) => {
    if (err) {
      console.log(err);
    } else {
      let formattedResponse = [
        { type: shoe.completeLook[0].type1, name: shoe.completeLook[0].name1, img_url: shoe.completeLook[0].img_url1, price: shoe.completeLook[0].price1 },
        { type: shoe.completeLook[0].type2, name: shoe.completeLook[0].name2, img_url: shoe.completeLook[0].img_url2, price: shoe.completeLook[0].price2 },
        { type: shoe.completeLook[0].type3, name: shoe.completeLook[0].name3, img_url: shoe.completeLook[0].img_url3, price: shoe.completeLook[0].price3 }
      ];
      res.json(formattedResponse);
      console.log(`Looks SQL Query Time: ${new Date() - queryStartTime}ms for product id: ${id}`);
    }
  });
});

app.get('/shares/:id', (req,res) => {
  let queryStartTime = new Date();
  Share.aggregate([{ $sample: { size: 5 } }], (err, share) => {
    if (err) {
      console.log(err);
    } else {
      res.json(share);
      console.log(`Shares SQL Query Time: ${new Date() - queryStartTime}ms for 5 random shares`);
    }
  });
});

module.exports = app;