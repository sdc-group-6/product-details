const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const db = require('../database/index.js');

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
  return db.select().from('products').whereIn('id', shoes).then((shoes) => {
    res.json(shoes);
    console.log(`Shoes SQL Query Time: ${new Date() - queryStartTime}ms for 18 randomized shoes`);
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/shoes/:shoeId', (req, res) => {
  let queryStartTime = new Date();
  let id = req.params.shoeId;
  return db.first().from('products').where('id', id).then((shoe) => {
    res.json(shoe);
    console.log(`Product Details SQL Query Time: ${new Date() - queryStartTime}ms for product id: ${id}`);
  }).catch((err) => {
    console.log('ERROR: ', err);
  });
});

app.get('/looks/:id', (req, res) => {
  let queryStartTime = new Date();
  let id = req.params.id;
  let idType = id.slice(0, 4) === 'shoe' ? 'shoe' :
               id.slice(0, 4) === 'shir' ? 'shirt' :
               id.slice(0, 4) === 'pant' ? 'pant' : 'jacket';
  return db.first().from('looks').where(idType + '_id', id).then((looks) => {
    let search = [looks.shoe_id, looks.shirt_id, looks.pant_id, looks.jacket_id];
    return db.select('type', 'name', 'img_url', 'price').from('products').whereIn('id', search);
  }).then((look) => {
    res.json(look);
    console.log(`Looks SQL Query Time: ${new Date() - queryStartTime}ms for product id: ${id}`);
  }).catch((err) => {
    console.log('ERROR: ', err);
  });
});

app.get('/shares/:id', (req,res) => {
  let queryStartTime = new Date();
  let maxIndex;
  let selections = [];
  if (process.env.NODE_ENV === 'test') {
    maxIndex = 200;
  } else {
    maxIndex = 1000000;
  }
  for (let i = 0; i < 5; i++) {
    selections.push(Math.ceil(Math.random() * maxIndex));
  }
  return db.select().from('shares').whereIn('shareId', selections).then((share) => {
    res.json(share);
    console.log(`Shares SQL Query Time: ${new Date() - queryStartTime}ms for 5 random shares`);
  }).catch((err) => {
    console.log('ERROR: ', err);
  });
});

module.exports = app;
