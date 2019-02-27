/* eslint-disable no-console */
const fs = require('fs');
const request = require('request');

const download = (uri, filepath, fileIndex, callback) => {
  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(filepath + fileIndex + '.png')).on('close', callback);
  });
};

const downloadAsync = (index, searchTerm) => {
  return new Promise((resolve) => {
    download('https://source.unsplash.com/200x300/?' + searchTerm, './database/images/' + searchTerm, Math.ceil(index / 2), () => setTimeout(() => resolve(index), 5000));
  });
};

const loop = (index) => {
  let searchTerm = index % 2 === 0 ? 'clothing' : 'footwear';
  downloadAsync(index, searchTerm).then((index) => {
    if (index + 1 > 100) {
      console.log('done');
    } else {
      return loop(index + 1);
    }
  });
};

loop(1);
