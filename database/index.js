const Sequelize = require('sequelize');
const dbUser = process.env.DB_USER || require('../config.js').user;
const dbPw = process.env.DB_PW || require('../config.js').pw;

const db = new Sequelize('adidas', dbUser, dbPw, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

const Shoes = db.define('Shoes', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  img_url: Sequelize.STRING,
  short_desc: Sequelize.STRING,
  long_desc: Sequelize.STRING(1000),
  type: Sequelize.STRING,
  price: Sequelize.INTEGER,
  rating: Sequelize.DECIMAL,
  review_count: Sequelize.INTEGER,
  details: Sequelize.STRING(1000),
});

const Looks = db.define('Looks', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  pant_name: Sequelize.STRING,
  pant_url: Sequelize.STRING,
  pant_price: Sequelize.INTEGER,
  shirt_name: Sequelize.STRING,
  shirt_url: Sequelize.STRING,
  shirt_price: Sequelize.INTEGER,
  jacket_name: Sequelize.STRING,
  jacket_url: Sequelize.STRING,
  jacket_price: Sequelize.INTEGER,
});

const Shares = db.define('Shares', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  user1: Sequelize.STRING,
  img1: Sequelize.STRING,
  user2: Sequelize.STRING,
  img2: Sequelize.STRING,
  user3: Sequelize.STRING,
  img3: Sequelize.STRING,
  user4: Sequelize.STRING,
  img4: Sequelize.STRING,
  user5: Sequelize.STRING,
  img5: Sequelize.STRING,
});

module.exports.db = db;
module.exports.Shoes = Shoes;
module.exports.Looks = Looks;
module.exports.Shares = Shares;
