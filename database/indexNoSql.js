const mongoose = require('mongoose');
let databaseName = process.env.NODE_ENV === 'test' ? 'adidasnewtest' : 'adidasnewdev';

mongoose.connect(`mongodb://localhost/${databaseName}`);
 
const db = mongoose.connection;
 
module.exports = db;