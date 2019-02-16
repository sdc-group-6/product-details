const mysql = require('mysql');
const config = require('../config.js');
const dbUser = require('../config.js').user || process.env.DB_USER;
const dbPw = require('../config.js').pw || process.env.DB_PW;
const Sequelize = require('sequelize');

const db = new Sequelize('adidas', dbUser, dbPw, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

let Shoes = db.define('Shoes', {
  id: {type:Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.STRING,
  img_url: Sequelize.STRING,
  short_desc: Sequelize.STRING,
  long_desc: Sequelize.STRING(1000),
  type: Sequelize.STRING,
  price: Sequelize.INTEGER,
  rating: Sequelize.DECIMAL,
  review_count: Sequelize.INTEGER,
  details: Sequelize.STRING(1000)
})

let Looks = db.define('Looks', {
  id: {type:Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  pant_name: Sequelize.STRING,
  pant_url: Sequelize.STRING,
  pant_price: Sequelize.INTEGER,
  shirt_name: Sequelize.STRING,
  shirt_url: Sequelize.STRING,
  shirt_price: Sequelize.INTEGER,
  jacket_name: Sequelize.STRING,
  jacket_url: Sequelize.STRING,
  jacket_price: Sequelize.INTEGER
})

let Shares = db.define('Shares', {
  id: {type:Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  user1: Sequelize.STRING,
  img1: Sequelize.STRING,
  user2: Sequelize.STRING,
  img2: Sequelize.STRING,
  user3: Sequelize.STRING,
  img3: Sequelize.STRING,
  user4: Sequelize.STRING,
  img4: Sequelize.STRING,
  user5: Sequelize.STRING,
  img5: Sequelize.STRING
})

module.exports.db = db;
module.exports.Shoes = Shoes;
module.exports.Looks = Looks;
module.exports.Shares = Shares;
