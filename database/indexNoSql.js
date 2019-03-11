const mongoose = require('mongoose');
let databaseName = process.env.NODE_ENV === 'test' ? 'adidasnewtest' : 'adidasnewdev';
const credentials = require('../config.js');
const dbUser = process.env.NODE_ENV === 'test' ? credentials.testuser : credentials.user;
const dbPw = process.env.NODE_ENV === 'test' ? credentials.testpw : credentials.pw;

// using local database:
mongoose.connect(`mongodb://localhost/${databaseName}`, { useNewUrlParser: true });

// using EC2 DB instance:
// mongoose.connect(`mongodb://${dbUser}:${dbPw}@3.90.50.238/${databaseName}`, { useNewUrlParser: true });

// using EC2 mongos instance:
// mongoose.connect('mongodb://100.26.123.214/adidasnewdev2', { useNewUrlParser: true });
 
const db = mongoose.connection;

// May need to toggle while seeding:
module.exports = db;
// export default db;