const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const db = require('../database/indexNoSql.js');
const Product = require('../database/modelNoSql').Product;
const Share = require('../database/modelNoSql').Share;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const randomProdNum = () => {
  let max = process.env.NODE_ENV === 'test' ? 100 : 2499900;
  return Math.floor(Math.random() * max) + 1;
};

const randomImg = () => {
  var arr = [];
  for (var i = 0; i < 18; i++) {
    arr.push('shoe' + randomProdNum());
  }
  return arr;
};

const generateProps = (prodId) => {
  let product;
  let shares;
  let products;
  let looks;
  Product.findOne({ _id: prodId }, (err, prod) => {
    if (err) {
      return 404;
    }
    product = prod;
    let startId = randomProdNum() * 4;
    Share.find().where('_id').in([startId, startId + 1, startId + 2, startId + 3, startId + 4]).exec((err, share) => {
      if (err) {
        return 503;
      }
      shares = {
        user1: shares[0].user,
        img1: shares[0].img,
        user2: shares[1].user,
        img2: shares[1].img,
        user3: shares[2].user,
        img3: shares[2].img,
        user4: shares[3].user,
        img4: shares[3].img,
        user5: shares[4].user,
        img5: shares[4].img
      };
      Product.find().where('_id').in(randomImg()).exec((err, shoes) => {
        if (err) {
          return 503;
        }
        products = shoes;
        looks = {
          pant_name: product.completeLook[0].name1,
          pant_url: product.completeLook[0].img_url1,
          pant_price: product.completeLook[0].price1,
          shirt_name: product.completeLook[0].name2,
          shirt_url: product.completeLook[0].img_url2,
          shirt_price: product.completeLook[0].price2,
          jacket_name: product.completeLook[0].name3,
          jacket_url: product.completeLook[0].img_url3,
          jacket_price: product.completeLook[0].price3
        };
        return { product, shares, products, looks };
      });
    });
  });
};

app.use('/assets', express.static(path.join(__dirname, '/../public')));
app.use(cors({
  'origin': '*',
}));

app.get('/shoes', (req, res) => {
  let shoes = randomImg();
  Product.find().where('_id').in(shoes).exec((err, shoes) => {
    if (err) {
      console.log(err);
      res.sendStatus(503);
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
      res.sendStatus(503);
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
    maxIndex = 9999990;
  }
  let startId = Math.floor(Math.random() * maxIndex) + 1;
  selections = [startId, startId + 1, startId + 2, startId + 3, startId + 4];
  Share.find().where('_id').in(selections).exec((err, share) => {
    if (err) {
      console.log(err);
      res.sendStatus(503);
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