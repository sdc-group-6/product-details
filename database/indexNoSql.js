const mongoose = require('mongoose');
let databaseName = process.env.NODE_ENV === 'test' ? 'adidasnewtest' : 'adidasnewdev';
const credentials = require('../config.js');

// using local database:
// mongoose.connect(`mongodb://localhost/${databaseName}`, { useNewUrlParser: true });

// using EC2 DB instance:
mongoose.connect(`mongodb://${credentials.user}:${credentials.pw}@3.94.57.92/${databaseName}`, { useNewUrlParser: true });
 
const db = mongoose.connection;

module.exports = db;