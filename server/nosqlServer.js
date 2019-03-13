import express from 'express';
import cors from 'cors';
const app = express();
import path from 'path';
import db from '../database/indexNoSql.js';
import cache from '../database/indexRedis.js';
import { Product, Share } from '../database/modelNoSql';
import dataStorre from './dbController';
import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PageApp from '../client/src/components/App';
import Layout from './layout';
import bodyParser from 'body-parser';
import * as Promise from 'bluebird';
Promise.promisifyAll([cache, Product, Share]);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let leastFreqCachedItem;
let cachedData;

// retrieve persisted data from redis as soon as server starts and update MongoDB with view_count
const retrieveCache = () => {
  const keysAsync = () => {
    return new Promise((resolve, reject) => {
      cache.keys('*', (err, keys) => {
        if (err) {
          reject(err);
        } else {
          resolve(keys);
        }
      });
    });
  };
  return keysAsync().then((keys) => {
    let data = keys || [];
    console.log('keys: ', data);
    let promiseList = [];
    data.forEach((key) => {
      let promise = new Promise((resolve, reject) => {
        cache.get(key, (err, reply) => {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        });
      });
      promiseList.push(promise);
    });
    return Promise.all(promiseList);
  }).then((values) => {
    let data = values || [];
    return data;
  }).then ((data) => {
    if (data.length === 0) {
      leastFreqCachedItem = { view_count: 0 };
    } else {
      data.forEach((item) => {
        JSON.parse(item);
        if (!leastFreqCachedItem || item.view_count < leastFreqCachedItem.view_count) {
          leastFreqCachedItem = item;
        }
      });
    }
    return data;
  }).then((data) => {
    cachedData = data;
  });
};

retrieveCache();

const updateCacheWithItem = (item) => {
  console.log(`length of cachedData is ${cachedData.length}`);
  if (cachedData.length < 18) {
    cachedData.push(item);
    const setAsync = (key, value) => {
      return new Promise((resolve, reject) => {
        cache.set(key, value, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    };
    return setAsync(item._id, JSON.stringify(item)).then(() => {
      for (let i = 0; i < cachedData.length; i++) {
        if (cachedData[i].view_count < item.view_count) {
          leastFreqCachedItem = cachedData[i];
          return item;
        }
      }
      leastFreqCachedItem = item;
      return item;
    }).catch((err) => console.log(`Something went wrong: ${err}`));
  } else {
    let promises = [];
    for (let i = 0; i < cachedData.length; i++) {
      if (cachedData[i] === leastFreqCachedItem) {
        return Product.findOneAndUpdateAsync({ _id: cachedData[i]._id }, { view_count: cachedData[i].view_count }).then(() => {
          cache.del(cachedData[i]._id);
          cachedData.splice(i, 1, item);
          console.log(`${cachedData[i]._id} removed from cache`);
          return item;
        }).catch((err) => console.log(`Something went wrong: ${err}`));
      }
      if (cachedData[i] !== leastFreqCachedItem && cachedData[i].view_count < item.view_count) {
        leastFreqCachedItem = cachedData[i];
      }
    }
  }
};




//   if (cachedData.length < 18) {
//     cachedData.push(item);
//     cache.set(item._id, JSON.stringify(item), () => console.log(`${item._id} added to cache`));
//     for (let i = 0; i < cachedData.length; i++) {
//       if (cachedData[i].view_count < item.view_count) {
//         leastFreqCachedItem = cachedData[i];
//         return;
//       }
//     }
//     leastFreqCachedItem = item;
//   } else {
//     for (let i = 0; i < cachedData.length; i++) {
//       if (cachedData[i] === leastFreqCachedItem) {
//         cache.del(cachedData[i]._id);
//         Product.findOneAndUpdate({ _id: cachedData[i]._id }, { view_count: cachedData[i].view_count }, (err) => {
//           if (err) {
//             console.log('Something went wrong: ', err);
//           } else {
//             cachedData.splice(i, 1, item);
//             console.log(`${cachedData[i]._id} removed from cache`);
//           }
//         });
//       }
//       if (cachedData[i] !== leastFreqCachedItem && cachedData[i].view_count < item.view_count) {
//         leastFreqCachedItem = cachedData[i];
//       }
//     }
//   }
//   if (!leastFreqCachedItem) {
//     leastFreqCachedItem = item;
//   }
// };




// cache.keys('*', (err, data) => {
//   if (err) {
//     console.log('There was an issue accessing redis: ', err);
//   } else {
//     cachedData = data || [];
//     if (cachedData.length === 0) {
//       leastFreqCachedItem = { view_count: 0 };
//     } else {
//       cachedData.forEach((item) => {
//         JSON.parse(item);
//         if (!leaseFreqCachedItem || item.view_count < leastFreqCachedItem.view_count) {
//           leastFreqCachedItem = item;
//         }
//         Product.findOneAndUpdate({ _id: item._id }, { view_count: item.view_count }, (err) => {
//           console.log('There was an issue updating a mongo record: ', err);
//         });
//       });
//       console.log('Cached Data Retrieved! ', cachedData);
//     }
//   }
// });

// need to adjust max back to 100 : 2499990 once database fully seeded
const randomProdNum = () => {
  let max = process.env.NODE_ENV === 'test' ? 100 : 24990;
  return Math.floor(Math.random() * max) + 1;
};

const randomImg = () => {
  var arr = [];
  for (var i = 0; i < 18; i++) {
    arr.push('shoe' + randomProdNum());
  }
  return arr;
};

const existsAsync = (prodId) => {
  return new Promise((resolve) => {
    cache.exists(prodId, (result) => resolve(result));
  });
};

const getItemAsync = (prodId) => {
  let product;
  return existsAsync(prodId).then((result) => {
    if (result) {
      let cachedItem = cachedData.filter((item) => item._id === prodId);
      cachedItem[0].view_count++;
      let promisifiedItem = Promise.resolve(cachedItem[0]);
      return promisifiedItem;
    } else {
      return Product.findOneAndUpdateAsync({ _id: prodId }, { $inc: { view_count: 1 } }).then((prod) => {
        product = prod;
        updateCacheWithItem(product);
        return product;
      });
    }
  });
};

// const getItemAsync = (prodId) => {
//   let product;
//   if (cache.exists(prodId)) {
//     let cachedItem = cachedData.filter((item) => item._id === prodId);
//     cachedItem[0].view_count++;
//     let promisifiedItem = Promise.resolve(cachedItem[0]);
//     return promisifiedItem;
//   } else {
//     Product.findOneAndUpdateAsync({ _id: prodId }, { $inc: { view_count: 1 } }).then((prod) => {
//       product = prod;
//       updateCacheWithItem(product);
//       return product;
//     });
//   }
// };

const getLooks = (product) => {
  return {
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
};

const getSharesAsync = () => {
  let startId = randomProdNum() * 4;
  return Share.find().where('_id').in([startId, startId + 1, startId + 2, startId + 3, startId + 4]).exec().then((share) => {
    return {
      user1: share[0].user,
      img1: share[0].img,
      user2: share[1].user,
      img2: share[1].img,
      user3: share[2].user,
      img3: share[2].img,
      user4: share[3].user,
      img4: share[3].img,
      user5: share[4].user,
      img5: share[4].img
    };
  });
};

const getAlsoLikesAsync = () => {
  if (cachedData.length === 18) {
    return cachedData;
  } else {
    console.log('querying mongo for also likes data');
    return Product.find().where('_id').in(randomImg()).exec();
  }
};

const renderToHTML = (props) => {
  let component = React.createElement(PageApp, props);
  return Layout(JSON.stringify(props), ReactDOMServer.renderToString(component));
};

//remove
// const renderToHTML = (prodId, callback) => {
//   let product;
//   let shares;
//   let products;
//   let looks;
//   Product.findOneAndUpdate({ _id: prodId }, { $inc: { view_count: 1 } }, (err, prod) => {
//     if (err) {
//       callback(404);
//       //return?
//     }
//     product = prod;
//     updateCache(product);
//     let startId = randomProdNum() * 4;
//     Share.find().where('_id').in([startId, startId + 1, startId + 2, startId + 3, startId + 4]).exec((err, share) => {
//       if (err) {
//         callback(503);
//       }
//       shares = {
//         user1: share[0].user,
//         img1: share[0].img,
//         user2: share[1].user,
//         img2: share[1].img,
//         user3: share[2].user,
//         img3: share[2].img,
//         user4: share[3].user,
//         img4: share[3].img,
//         user5: share[4].user,
//         img5: share[4].img
//       };
//       Product.find().where('_id').in(randomImg()).exec((err, shoes) => {
//         if (err) {
//           callback(503);
//         }
//         products = shoes;
//         looks = {
//           pant_name: product.completeLook[0].name1,
//           pant_url: product.completeLook[0].img_url1,
//           pant_price: product.completeLook[0].price1,
//           shirt_name: product.completeLook[0].name2,
//           shirt_url: product.completeLook[0].img_url2,
//           shirt_price: product.completeLook[0].price2,
//           jacket_name: product.completeLook[0].name3,
//           jacket_url: product.completeLook[0].img_url3,
//           jacket_price: product.completeLook[0].price3
//         };
//         let propsForRender = { product: product, shares: shares, products: products, looks: looks };
//         let component = React.createElement(PageApp, propsForRender);
//         callback(null, Layout(JSON.stringify(propsForRender), ReactDOMServer.renderToString(component)));
//       });
//     });
//   });
// };

// const renderCachedToHTML = (cachedProduct, callback) => {
//   cachedProduct.view_count++;
//   let product = cachedProduct;
//   let shares;
//   let products;
//   let looks;
//   let startId = randomProdNum() * 4;
//   Share.find().where('_id').in([startId, startId + 1, startId + 2, startId + 3, startId + 4]).exec((err, share) => {
//     if (err) {
//       callback(503);
//     }
//     shares = {
//       user1: share[0].user,
//       img1: share[0].img,
//       user2: share[1].user,
//       img2: share[1].img,
//       user3: share[2].user,
//       img3: share[2].img,
//       user4: share[3].user,
//       img4: share[3].img,
//       user5: share[4].user,
//       img5: share[4].img
//     };
//     if (cachedData.length === 18) {
//       products = cachedData;
//       looks = {
//         pant_name: product.completeLook[0].name1,
//         pant_url: product.completeLook[0].img_url1,
//         pant_price: product.completeLook[0].price1,
//         shirt_name: product.completeLook[0].name2,
//         shirt_url: product.completeLook[0].img_url2,
//         shirt_price: product.completeLook[0].price2,
//         jacket_name: product.completeLook[0].name3,
//         jacket_url: product.completeLook[0].img_url3,
//         jacket_price: product.completeLook[0].price3
//       };
//       let propsForRender = { product: product, shares: shares, products: products, looks: looks };
//       let component = React.createElement(PageApp, propsForRender);
//       callback(null, Layout(JSON.stringify(propsForRender), ReactDOMServer.renderToString(component)));
//     } else {
//       Product.find().where('_id').in(randomImg()).exec((err, shoes) => {
//         if (err) {
//           callback(503);
//         }
//         products = shoes;
//         looks = {
//           pant_name: product.completeLook[0].name1,
//           pant_url: product.completeLook[0].img_url1,
//           pant_price: product.completeLook[0].price1,
//           shirt_name: product.completeLook[0].name2,
//           shirt_url: product.completeLook[0].img_url2,
//           shirt_price: product.completeLook[0].price2,
//           jacket_name: product.completeLook[0].name3,
//           jacket_url: product.completeLook[0].img_url3,
//           jacket_price: product.completeLook[0].price3
//         };
//         let propsForRender = { product: product, shares: shares, products: products, looks: looks };
//         let component = React.createElement(PageApp, propsForRender);
//         callback(null, Layout(JSON.stringify(propsForRender), ReactDOMServer.renderToString(component)));
//       });
//     }
//   });
// };

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

app.get('/:shoeId', (req, res) => {
  let prodId = req.params.shoeId;
  let props = {
    product: null,
    shares: null,
    products: null,
    looks: null
  };
  return getItemAsync(prodId).then((item) => {
    props.product = item;
    return getLooks(item);
  }).then((looks) => {
    props.looks = looks;
    return getSharesAsync();
  }).then((shares) => {
    props.shares = shares;
    return getAlsoLikesAsync();
  }).then((alsoLikes) => {
    props.products = alsoLikes;
    return renderToHTML(props);
  }).then((html) => {
    res.status(200).send(html);
  }).catch((err) => {
    res.status(503).send();
  });
});



//   let cachedItem = cachedData.filter((item) => item._id === prodId);
//   if (cachedItem.length > 0) {
//     renderCachedToHTML(cachedItem[0], (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(503).send();
//       } else {
//         res.status(200).send(result);
//       }
//     });
//   } else {
//     renderToHTML(prodId, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(503).send();
//       } else {
//         res.status(200).send(result);
//       }
//     });
//   }
// });

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

export default app;
