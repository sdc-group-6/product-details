const express = require('express');
const app = express();
const { db , Shoes, Looks} = require('../database');
const mysql = require('mysql');


let randomId = () => {
  return Math.floor(Math.random() * (101));
}

let randomImg = () => {
  var arr = [];
  for (var i = 0; i < 12; i++) {
    arr.push(Math.floor(Math.random() * (101)))
  }
  return arr;
}

db.authenticate()
  .then(() => {
    console.log('Connection successful!');
  })
  .catch(err => {
    console.error('Connection failed: ', err);
  })

app.get('/shoes', (req,res) => {
  Shoes.sync()
    .then(() => {
      return Shoes.findAll();
    })
    .then(shoes => {
      res.json(shoes);
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/shoes/:shoeId', (req,res) => {
  let id = Number(req.params.shoeId);
  console.log(typeof id)
  Shoes.sync()
  .then(() => {
    console.log('hello im here')
    return Shoes.findOne({where: {id: id}});
  })
  .then(shoe => {
    res.json(shoe);
  })
  .catch(err => {
    console.log('ERROR: ', err);
  })
})

app.get('/looks', (req,res) => {
  let id = randomId();
  Shoes.sync()
  .then(() => {
    return Looks.findOne({where: {id: id}});
  })
  .catch(err => {
    console.log('error', err);
  })
})

const PORT = 8001;

app.use(express.static(__dirname + '/../public'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
