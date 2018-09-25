DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
    product_sales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY (department_id)
);