const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const db = require('../database/indexNoSql.js');
const Product = require('../database/modelNoSql').Product;
const Share = require('../database/modelNoSql').Share;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
  let shoes = randomImg();
  Product.find().where('_id').in(shoes).exec((err, shoes) => {
    if (err) {
      console.log(err);
    } else {
      res.json(shoes);
    }
  });
});

app.get('/shoes/:shoeId', (req, res) => {
  let id = req.params.shoeId;
  Product.findOne({ _id: id }, (err, shoe) => {
    if (err) {
      console.log(err);
    } else if (!shoe) {
      res.sendStatus(404);
    } else {
      res.json(shoe);
    }
  });
});

app.get('/shares/:id', (req, res) => {
  let maxIndex;
  let selections = [];
  if (process.env.NODE_ENV === 'test') {
    maxIndex = 190;
  } else {
    maxIndex = 1000000;
  }
  for (let i = 0; i < 5; i++) {
    selections.push(Math.ceil(Math.random() * maxIndex));
  }
  Share.find().where('_id').in(selections).exec((err, share) => {
    if (err) {
      console.log(err);
    } else {
      res.json(share);
    }
  });
});

app.post('/product', urlencodedParser, (req, res) => {
  let newProd = req.body;
  // add defaults
  newProd.rating = 0;
  newProd.review_count = 0;
  if (!newProd.completeLook) {
    newProd.completeLook = [{ id1: 'shoe1', type1: 'shoe', img1: 'https://s3-us-west-2.amazonaws.com/shoeimagestresrayas/shoe1', price1: 100, id2: 'shoe2', type2: 'shoe', img2: 'https://s3-us-west-2.amazonaws.com/shoeimagestresrayas/shoe2', price2: 100, id3: 'shoe3', type3: 'shoe', img3: 'https://s3-us-west-2.amazonaws.com/shoeimagestresrayas/shoe3', price3: 100 }]
  }
  // make sure necessary data is included
  if (!newProd._id || !newProd.type || !newProd.name || !newProd.img_url || !newProd.short_desc || !newProd.long_desc || !newProd.category || !newProd.price || !newProd.details) {
    res.status(400).send('Please include all required fields');
  } else {
    new Product(newProd).save((err, product) => {
      if (err) {
        console.log('Error: ', err);
        res.status(406).send();
      } else {
        res.sendStatus(201);
      }
    });
  }
});

app.put('/product/:id', urlencodedParser, (req, res) => {
  let id = req.params.id;
  let update = req.body;
  Product.findOne({ _id: id }, (err, product) => {
    if (err) {
      console.log('Error: ', err);
      res.status(404).send();
    } else {
      for (var key in update) {
        product[key] = update[key];
      }
      product.save((err, product) => {
        if (err) {
          console.log('Error: ', err);
          res.status(406).send();
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

app.delete('/product/:id', (req, res) => {
  let id = req.params.id;
  Product.deleteMany({ _id: id }, (err, product) => {
    if (err) {
      console.log('Error: ', err);
      res.status(404).send();
    } else {
      res.sendStatus(202);
    }
  });
});

module.exports = app;

/*
Test post request:

This in form-urlencoded:
id:test
type:shoe
name:test
img_url:www.no
short_desc:String
long_desc:String
category:String
price:50
details:String

Results in:
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:8001/product/add",
  "method": "POST",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "Postman-Token": "aa97c768-7473-4bfb-a63a-90268163369d"
  },
  "data": {
    "id": 'test',
    "type": 'shoe',
    "name": 'test',
    "img_url": 'www.no',
    "short_desc": 'String',
    "long_desc": 'String',
    "category": 'String',
    "price": 50,
    "details": 'String'
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});


{
id: 'test',
type: 'shoe',
name: 'test',
img_url: 'www.no',
short_desc: 'String',
long_desc: 'String',
category: 'String',
price: 50,
rating: 0,
review_count: 0,
details: 'String',
completeLook: [{
  id1: 'test',
  type1: 'jacket',
  name1: 'test',
  img_url1: 'www.no',
  price1: 70,
  id2: 'test',
  type2: 'shirt',
  name2: 'test',
  img_url2: 'www.no',
  price2: 80,
  id3: 'test',
  type3: 'pant',
  name3: 'test',
  img_url3: 'www.no',
  price3: 100
}]
}
*/