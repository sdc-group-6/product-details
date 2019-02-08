DROP DATABASE IF EXISTS adidas;
CREATE DATABASE adidas;

USE adidas;

DROP TABLE IF EXISTS shoes;
DROP TABLE IF EXISTS looks;

CREATE TABLE shoes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  img_url VARCHAR(150),
  short_desc VARCHAR(150),
  long_desc VARCHAR(1000),
  type VARCHAR (70),
  price INT,
  weight INT,
  composition VARCHAR(70),
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

/* mysql -u root < database/schema.sql */
