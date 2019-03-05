const mongoose = require('mongoose');
let databaseName = process.env.NODE_ENV === 'test' ? 'adidasnewtest' : 'adidasnewdev';
const credentials = require('../config.js');
const dbUser = process.env.NODE_ENV === 'test' ? credentials.testuser : credentials.user;
const dbPw = process.env.NODE_ENV === 'test' ? credentials.testpw : credentials.pw;

// using local database:
// mongoose.connect(`mongodb://localhost/${databaseName}`, { useNewUrlParser: true });

// using EC2 DB instance:
mongoose.connect(`mongodb://${dbUser}:${dbPw}@3.90.50.238/${databaseName}`, { useNewUrlParser: true });
 
const db = mongoose.connection;

module.exports = db;