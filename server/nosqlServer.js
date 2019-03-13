import express from 'express';
import cors from 'cors';
const app = express();
import path from 'path';
import db from '../database/indexNoSql.js';
import { Product } from '../database/modelNoSql';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PageApp from '../client/src/components/App';
import Layout from './layout';
app.use('/', express.static(path.join(__dirname, '/../public')));
import bodyParser from 'body-parser';
import dataStore from './dbController';
const urlencodedParser = bodyParser.urlencoded({ extended: false });

dataStore.buildCacheAsync();

const renderToHTML = (props) => {
  let component = React.createElement(PageApp, props);
  return Layout(JSON.stringify(props), ReactDOMServer.renderToString(component));
};

app.use('/assets', express.static(path.join(__dirname, '/../public')));
app.use(cors({
  'origin': '*',
}));


app.get('/shoes', (req, res) => {
  return dataStore.serveCacheAsync().then((shoes) => {
    res.status(200).send(shoes);
  }).catch((err) => {
    res.status(503).send(err);
  });
});

app.get('/:shoeId', (req, res) => {
  let prodId = req.params.shoeId;
  let props = {
    product: null,
    shares: null,
    products: null,
    looks: null
  };
  return dataStore.checkIfCachedAsync(prodId).then((cached) => {
    if (cached) {
      return dataStore.serveCacheItemAsync(prodId);
    } else {
      return dataStore.findProductAndIncrementAsync(prodId, 1);
    }
  }).then((product) => {
    props.product = product;
    return dataStore.getLooks(product);
  }).then((looks) => {
    props.looks = looks;
    return dataStore.getSharesAsync();
  }).then((shares) => {
    props.shares = shares;
    return dataStore.serveCacheAsync();
  }).then((products) => {
    props.products = products;
    return renderToHTML(props);
  }).then((html) => {
    res.status(200).send(html);
  }).catch((err) => {
    res.status(503).send(err);
  });
});

app.get('/shoes/:shoeId', (req, res) => {
  let id = req.params.shoeId;
  return dataStore.checkIfCachedAsync(prodId).then((cached) => {
    if (cached) {
      return dataStore.serveCacheItemAsync(prodId);
    } else {
      return dataStore.findProductAndIncrementAsync(prodId, 1);
    }
  }).then((product) => {
    if (!product) {
      res.status(404).send();
    } else {
      res.status(200).send(product);
    }
  }).catch((err) => {
    res.status(503).send(err);
  });
});

app.get('/shares/:id', (req, res) => {
  return dataStore.getSharesAsync().then((shares) => {
    res.status(200).send(shares);
  }).catch((err) => {
    res.status(503).send(err);
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

export default app;
