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
  var arr = [];
  for (var i = 0; i < 18; i++) {
    arr.push('shoe' + Math.ceil(Math.random() * 2500));
  }
  return arr;
};

app.get('/shoes', (req, res) => {
  let shoes = randomImg();
  return db.select().from('products').whereIn('id', shoes).then((shoes) => {
    res.json(shoes);
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/shoes/:shoeId', (req, res) => {
  let id = req.params.shoeId;
  return db.select().from('products').where('id', id).then((shoe) => {
    res.json(shoe[0]);
  }).catch((err) => {
    console.log('ERROR: ', err);
  });
});

app.get('/looks/:id', (req, res) => {
  let id = req.params.id;
  let idType = id.slice(0, 4) === 'shoe' ? 'shoe' :
               id.slice(0, 4) === 'shir' ? 'shirt' :
               id.slice(0, 4) === 'pant' ? 'pant' : 'jacket';
  return db.select().from('looks').where(idType + '_id', id).then((looks) => {
    let search = [looks[0].shoe_id, looks[0].shirt_id, looks[0].pant_id, looks[0].jacket_id];
    return db.select('type', 'name', 'img_url', 'price').from('products').whereIn('id', search);
  }).then((look) => {
    res.json(look);
  }).catch((err) => {
    console.log('ERROR: ', err);
  });
});

app.get('/shares/:id', (req,res) => {
  let startIndex = Math.ceil(Math.random() * 2500);
  return db.select().from('shares').limit(5).offset(startIndex).then((share) => {
    res.json(share);
  }).catch((err) => {
    console.log('ERROR: ', err);
  });
});

module.exports = app;
