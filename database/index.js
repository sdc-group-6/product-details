const mysql = require('mysql');
const config = require('../config.js');
const Sequelize = require('sequelize');

const db = new Sequelize('adidas', config.user , config.pw, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

var Shoes = db.define('Shoes', {
  id: {type:Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.STRING,
  img_url: Sequelize.STRING,
  short_desc: Sequelize.STRING,
  long_desc: Sequelize.STRING(1000),
  type: Sequelize.STRING,
  price: Sequelize.INTEGER,
  weight: Sequelize.INTEGER,
  composition: Sequelize.STRING,
  details: Sequelize.STRING(1000)
})

var Looks = db.define('Looks', {
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

module.exports.db = db;
module.exports.Shoes = Shoes;
module.exports.Looks = Looks;
