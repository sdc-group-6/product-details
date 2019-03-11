const mongoose = require('mongoose');
let databaseName = process.env.NODE_ENV === 'test' ? 'adidasnewtest' : 'adidasnewdev';
const credentials = require('../config.js');
const dbUser = process.env.NODE_ENV === 'test' ? credentials.testuser : credentials.user;
const dbPw = process.env.NODE_ENV === 'test' ? credentials.testpw : credentials.pw;

// using local database:
// mongoose.connect(`mongodb://localhost/${databaseName}`, { useNewUrlParser: true });

// using EC2 DB instance:
// mongoose.connect(`mongodb://${dbUser}:${dbPw}@3.90.50.238/${databaseName}`, { useNewUrlParser: true });

// using EC2 mongos instance:
// note: to run this database, go to app server in ec2 and enter: mongos --configdb config/3.88.151.0:27017,18.215.234.241:27017,54.92.177.245:27017 --bind_ip_all
mongoose.connect('mongodb://100.26.123.214/adidasnewdev2', { useNewUrlParser: true });
 
const db = mongoose.connection;

// May need to toggle while seeding:
module.exports = db;
// export default db;