DROP DATABASE IF EXISTS bamazon_db;
-- Creates the database --
CREATE DATABASE bamazon_db;

-- Make it so all of the following code will affect db --
USE bamazon_db; 

-- Creates the table 
CREATE TABLE Products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR (50) NOT NULL,
dept VARCHAR (50) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

