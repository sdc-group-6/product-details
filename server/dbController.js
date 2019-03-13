import cache from '../database/indexRedis.js';
import { Product, Share } from '../database/modelNoSql';


const dataStore = {
  
  minViewedCacheItem: {},
  
  // Returns all keys (s/b 18) from redis database; returns with array of productIds
  getCacheKeysAsync: () => {
    return new Promise((resolve, reject) => {
      cache.keys('*', (err, keys) => {
        if (err) {
          reject(err);
        } else {
          resolve(keys);
        }
      });
    });
  },
  
  // returns promise that resolves with array of parsed objects from redis
  getCacheDataAsync: (itemOrArray) => {
    let data = Array.isArray(itemOrArray) ? itemOrArray : [itemOrArray];
    let promiseList = [];
    data.forEach((key) => {
      let promise = new Promise((resolve, reject) => {
        cache.get(key, (err, reply) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(reply));
          }
        });
      });
      promiseList.push(promise);
    });
    return Promise.all(promiseList);
  },
  
  // Increments view-count in mongoDB and returns promise with details on product from mongoDB (including updated viewcount)
  findProductAndIncrementAsync: (prodId, increment) => {
    let foundProduct;
    return Product.findOneAndUpdate({ _id: prodId }, { $inc: { view_count: increment } }, { new: true }).lean().exec().then((product) => {
      foundProduct = product;
      if (product.view_count > dataStore.minViewedCacheItem.view_count + dataStore.minViewedCacheItem.cached_views) {
        console.log(`${dataStore.minViewedCacheItem._id} being replaced with ${product._id}`);
        return dataStore.replaceProdInCache(dataStore.minViewedCacheItem._id, product);
      } else {
        return;
      }
    }).then(() => {
      return foundProduct;
    });
  },

  // Updates mongoDB with incremental cache views for all items in the cache.  Used prior to cache update.
  updateMongoWithCacheItems: (itemOrArray) => {
    const items = Array.isArray(itemOrArray) ? itemOrArray : [itemOrArray];
    let updates = [];
    items.forEach((item) => {
      if (item.cached_views) {
        updates.push(dataStore.findProductAndIncrementAsync(item._id, item.cached_views));
      }
    });
    return Promise.all(updates);
  },

  findMinViewedCacheItem: (cacheData) => {
    if (dataStore.minViewedCacheItem.view_count) {
      console.log(`current min viewed cache item to be replaced: ${dataStore.minViewedCacheItem}`);
      let currMinViews = dataStore.minViewedCacheItem.view_count + dataStore.minViewedCacheItem.cached_views;
      for (let i = 0; i < cacheData.length; i++) {
        if (cacheData[i].view_count + cacheData[i].cached_views < currMinViews) {
          dataStore.minViewedCacheItem = cacheData[i];
          return;
        }
      }
    } else {
      let currMinViews = Infinity;
      for (let i = 0; i < cacheData.length; i++) {
        if (cacheData[i].view_count + cacheData[i].cached_views < currMinViews) {
          dataStore.minViewedCacheItem = cacheData[i];
          currMinViewes = cacheData[i].view_count + cacheData[i].cached_views;
        }
      }
    }
  },

  setProdInCache: (product, prodToReplace) => {
    if (!product.cached_views) {
      product.cached_views = 0;
    }
    const setProduct = new Promise((resolve, reject) => {
      cache.set(product._id, JSON.stringify(product), (err, product) => {
        if (err) {
          reject(err);
        } else {
          resolve(product);
        }
      });
    });
    if (!prodToReplace) {
      return setProduct;
    } else {
      return Promise.all([setProduct, Promise.resolve(cache.del(prodToReplace))]);
    }
  },

  replaceProdInCache: (removeProdId, addProd) => {
    return dataStore.setProdInCache(addProd, removeProdId).then((result) => {
      if (!result[1]) { console.log('item to be deleted was not in cache'); }
      return dataStore.getCacheKeysAsync();
    }).then((keys) => {
      return dataStore.getCacheDataAsync(keys);
    }).then((cacheData) => {
      return dataStore.findMinViewedCacheItem(cacheData);
    }).catch((err) => console.log(`There was an issue replacing a product in the cache: ${err}`));
  },

  flushCacheAsync: () => {
    return new Promise((resolve, reject) => {
      cache.flushdb(() => {
        resolve();
      });
    });
  },
  
  // Get top 18 most-viewed from mongoDB
  buildCacheAsync: () => {
    return dataStore.getCacheKeysAsync().then((keys) => {
      return dataStore.getCacheDataAsync(keys);
    }).then((cacheData) => {
      return dataStore.updateMongoWithCacheItems(cacheData);
    }).then(() => {
      return dataStore.flushCacheAsync();
    }).then(() => {
      return Product.find({}).sort({ 'view_count': -1 }).limit(18).lean().exec();
    }).then((topProducts) => {
      console.log(`found ${topProducts.length} top products`);
      dataStore.minViewedCacheItem = topProducts[17];
      let updates = [];
      topProducts.forEach((product) => {
        let update = new Promise((resolve, reject) => {
          product.cached_views = 0;
          cache.set(product._id, JSON.stringify(product), () => resolve());
        });
        updates.push(update);
      });
      return Promise.all(updates);
    }).then(() => {
      return dataStore.getCacheKeysAsync();
    }).then((keys) => {
      return dataStore.getCacheDataAsync(keys);
    }).then((data) => {
      console.log(`Redis cache updated with ${data}`);
      return;
    }).catch((err) => console.log(`There was an issue building cache: ${err}`));
  },

  // Get all 18 cached items for 'Also Likes' request
  serveCacheAsync: () => {
    return dataStore.getCacheKeysAsync().then((keys) => {
      if (keys.length < 18) {
        throw new Error('There was an issue with cached data');
      } else if (keys.length > 18) {
        console.log(`Cache size is ${keys.length} items`);
        return dataStore.getCacheDataAsync(keys.slice(0, 18));
      } else {
        return dataStore.getCacheDataAsync(keys);
      }
    });
  },

  serveCacheItemAsync: (prodId) => {
    let result;
    return dataStore.getCacheDataAsync(prodId).then((item) => {
      let product = item[0];
      product.cached_views = product.cached_views + 1;
      result = product;
      return dataStore.setProdInCache(product);
    }).then((item) => {
      if (item._id === dataStore.minViewedCacheItem._id) {
        return dataStore.getCacheKeysAsync().then((keys) => {
          return dataStore.getCacheDataAsync(keys);
        }).then((data) => {
          return dataStore.findMinViewedCacheItem(data);
        });
      } else {
        return;
      }
    }).then(() => {
      return result;
    }).catch((err) => console.log(`There was an issue serving the item from cache: ${err}`));
  },

  checkIfCachedAsync: (prodId) => {
    return new Promise((resolve, reject) => {
      cache.exists(prodId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getLooks: (product) => {
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
  },

  getSharesAsync: () => {
    // need to adjust max back to 100 : 2499990 once database fully seeded
    const randomProdNum = () => {
      let max = process.env.NODE_ENV === 'test' ? 100 : 24990;
      return Math.floor(Math.random() * max) + 1;
    };
    let startId = randomProdNum() * 4;
    return Share.find().where('_id').in([startId, startId + 1, startId + 2, startId + 3, startId + 4]).lean().exec().then((share) => {
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
  }

};

export default dataStore;