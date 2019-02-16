DROP DATABASE IF EXISTS adidas;
CREATE DATABASE adidas;

USE adidas;

DROP TABLE IF EXISTS shoes;
DROP TABLE IF EXISTS looks;
DROP TABLE IF EXISTS shares;

CREATE TABLE shoes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  img_url VARCHAR(150),
  short_desc VARCHAR(150),
  long_desc VARCHAR(1000),
  type VARCHAR (70),
  price INT,
  rating DECIMAL(5,2),
  review_count INT,
  details VARCHAR (1000)
);

CREATE TABLE looks (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  pant_name VARCHAR(200),
  pant_url VARCHAR(200),
  pant_price INT,
  shirt_name VARCHAR(200),
  shirt_url VARCHAR(200),
  shirt_price INT,
  jacket_name VARCHAR(200),
  jacket_url VARCHAR(200),
  jacket_price INT
);

CREATE TABLE shares (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user1 VARCHAR(150),
  img1 VARCHAR(300),
  user2 VARCHAR(150),
  img2 VARCHAR(300),
  user3 VARCHAR(150),
  img3 VARCHAR(300),
  user4 VARCHAR(150),
  img4 VARCHAR(300),
  user5 VARCHAR(150),
  img5 VARCHAR(300)
)

/* mysql -u root < database/schema.sql */
