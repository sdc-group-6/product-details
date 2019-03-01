const mongoose = require('mongoose');
let databaseName = process.env.NODE_ENV === 'test' ? 'adidasnewtest' : 'adidasnewdev';

mongoose.connect(`mongodb://localhost/${databaseName}`);
 
const db = mongoose.connection;
 
db.on('error', function (err) {
  console.log('Mongo connection error', err);
});
db.once('open', function () {
  console.log('Connected to Mongo');
});

module.exports = db;