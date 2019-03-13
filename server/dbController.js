import cache from '../database/indexRedis.js';
import { Product } from '../database/modelNoSql';


const data = {
  
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
    return Product.findOneAndUpdate({ _id: prodId }, { $inc: { view_count: increment } }, { new: true }).exec();
  },

  // Updates mongoDB with incremental cache views for all items in the cache.  Used prior to cache update.
  updateMongoWithCacheItems: (itemOrArray) => {
    const items = Array.isArray(itemOrArray) ? itemOrArray : [itemOrArray];
    let updates = [];
    items.forEach((item) => {
      if (item.cached_views) {
        promisified.push(this.findProductAndIncrementAsync(item._id, item.cached_views));
      } else {
        promisified.push(this.findProductAndIncrementAsync(item._id, 1));
      }
    });
    return Promise.all(updates);
  },

  findMinViewedCacheItem: (cacheData) => {
    if (this.minViewedCacheItem.view_count) {
      let currMinViews = this.minViewedCacheItem.view_count + this.minViewedCacheItem.cached_views;
      for (let i = 0; i < cacheData.length; i++) {
        if (cacheData[i].view_count + cacheData[i].cached_views < currMinViews) {
          this.minViewedCacheItem = cacheData[i];
          return;
        }
      }
    } else {
      let currMinViews = Infinity;
      for (let i = 0; i < cacheData.length; i++) {
        if (cacheData[i].view_count + cacheData[i].cached_views < currMinViews) {
          this.minViewedCacheItem = cacheData[i];
          currMinViewes = cacheData[i].view_count + cacheData[i].cached_views;
        }
      }
    }
  },

  setProdInCache: (product) => {
    if (!product.cached_views) {
      product.cached_views = 0;
    }
    return new Promise((resolve, reject) => {
      cache.set(product._id, JSON.stringify(product), (product) => resolve(product));
    });
  },

  replaceProdInCache: (removeProdId, addProd) => {
    return this.setProdInCache(addProd).then(() => {
      cache.del(removeProdId);
      return;
    }).then(() => {
      return this.getCacheKeysAsync();
    }).then((keys) => {
      return this.getCacheDataAsync(keys);
    }).then((cacheData) => {
      return this.findMinViewedCacheItem(cacheData, addProd.view_count);
    }).catch((err) => console.log(`There was an issue replacing a product in the cache: ${err}`));
  },

  flushCacheAsync: () => {
    return new Promise((resolve, reject) => {
      cache.flushdb(() => {
        if (err) {
          reject(err);
        } else {
          resolve(succeeded);
        }
      });
    });
  },
  
  // Get top 18 most-viewed from mongoDB
  buildCacheAsync: () => {
    return this.getCacheKeysAsync().then((keys) => {
      return this.getCacheDataAsync(keys);
    }).then((cacheData) => {
      return this.updateMongoWithCacheItems(cacheData);
    }).then(() => {
      return this.flushCacheAsync();
    }).then(() => {
      return Product.find().sort({ 'view_count': -1 }).limit(18).exec();
    }).then((topProducts) => {
      minViewedCacheItem = topProducts[17];
      let updates = [];
      topProducts.forEach((product) => {
        let update = new Promise((resolve, reject) => {
          cache.set(product._id, JSON.stringify(product), () => resolve());
        });
        updates.push(update);
      });
      return Promise.all(updates);
    }).catch((err) => console.log(`There was an issue building cache: ${err}`));
  },

  // Get all 18 cached items for 'Also Likes' request
  serveCacheAsync: () => {
    return this.getCacheKeysAsync().then((keys) => {
      if (keys.length < 18) {
        throw new Error('There was an issue with cached data');
      } else if (keys.length > 18) {
        console.log(`Cache size is ${keys.length} items`);
        return this.getCacheDataAsync(keys.slice(0, 18));
      } else {
        return this.getCacheDataAsync(keys);
      }
    });
  },

  serveCacheItemAsync: (prodId) => {
    let result;
    return this.getCacheDataAsync(prodId).then((item) => {
      item.cached_views = item.cached_views + 1;
      result = item;
      return this.setProdInCache(item);
    }).then((item) => {
      if (item._id === this.minViewedCacheItem._id) {
        return this.getCacheKeysAsync().then((keys) => {
          return this.getCacheDataAsync(keys);
        }).then((data) => {
          return this.findMinViewedCacheItem(data);
        });
      } else {
        return;
      }
    }).then(() => {
      return result;
    }).catch((err) => console.log(`There was an issue serving the item from cache: ${err}`));
  }

};

