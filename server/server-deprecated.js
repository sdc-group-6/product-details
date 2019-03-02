const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const db = require('../database/index.js');
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
    if (!shoe) {
      res.sendStatus(404);
    } else {
      res.json(shoe);
      console.log(`Product Details SQL Query Time: ${new Date() - queryStartTime}ms for product id: ${id}`);
    }
  }).catch((err) => {
    console.log('ERROR: ', err);
  });
});

app.get('/looks/:id', (req, res) => {
  let queryStartTime = new Date();
  let id = req.params.id;
  let idType = id.slice(0, 4) === 'shoe' ? 'shoe' :
               id.slice(0, 4) === 'shir' ? 'shirt' :
               id.slice(0, 4) === 'pant' ? 'pant' :
               id.slice(0, 4) === 'jack' ? 'jacket' : 'shoe';
  return db.first().from('looks').where(idType + '_id', id).then((looks) => {
    if (!looks) {
      console.log('no looks found');
    } else {
      let search = [looks.shoe_id, looks.shirt_id, looks.pant_id, looks.jacket_id];
      return db.select('type', 'name', 'img_url', 'price').from('products').whereIn('id', search);
    }
  }).then((look) => {
    if (!look) {
      res.sendStatus(404);
    } else {
      res.json(look);
      console.log(`Looks SQL Query Time: ${new Date() - queryStartTime}ms for product id: ${id}`);
    }
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

app.post('/product', urlencodedParser, (req, res) => {
  let queryStartTime = new Date();
  let newProd = req.body;
  // add defaults
  newProd.rating = 0;
  newProd.review_count = 0;
  if (!newProd.completeLook) {
    newProd.completeLook = { shoe_id: newProd.id, shirt_id: 'shirt1', pant_id: 'pant1', jacket_id: 'jacket1' };
  }
  // make sure necessary data is included
  if (!newProd.id || !newProd.type || !newProd.name || !newProd.img_url || !newProd.short_desc || !newProd.long_desc || !newProd.category || !newProd.price || !newProd.details) {
    res.status(400).send('Please include all required fields');
  } else {
    let look = newProd.completeLook;
    let product = newProd;
    delete product.completeLook;
    return db('products').insert(product).then(() => {
      return db('looks').insert(look);
    }).then(() => {
      res.status(201).send();
      console.log(`Time to Post a new product: ${new Date() - queryStartTime}ms`);
    }).catch((err) => {
      console.log('Error: ', err);
      res.status(400).send();
    });
  }
});

app.put('/product/:id', urlencodedParser, (req, res) => {
  let queryStartTime = new Date();
  let id = req.params.id;
  let update = req.body;
  return db('products').where({ id: id }).update(update).then(() => {
    res.status(201).send();
    console.log(`Time to Update a product: ${new Date() - queryStartTime}ms`);
  }).catch((err) => {
    console.log('Error: ', err);
  });
});

app.delete('/product/:id', (req, res) => {
  let queryStartTime = new Date();
  let id = req.params.id;
  return db('products').select('type').where({ id: id }).then((result) => {
    let type = result[0].type;
    return db('looks').where(`${type}_id`, id).del();
  }).then(() => {
    return db('products').where({ id: id }).del();  
  }).then(() => {
    res.status(202).send();
    console.log(`Time to Delete a product: ${new Date() - queryStartTime}ms`);
  }).catch((err) => {
    console.log('Error: ', err);
    res.status(404).send();
  });
});

module.exports = app;
