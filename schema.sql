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

SELECT * from products;

SELECT * FROM departments;

DROP table products;

SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales ) AS product_sales, SUM(p.product_sales )-d.over_head_costs AS total_profit
FROM departments d
JOIN products p ON p.department_name = d.department_name
GROUP BY p.department_name;