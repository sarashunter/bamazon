const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889, //Replace with local port.
    user: 'root',
    password: 'root',
    database: 'bamazon'

});

connection.connect(err => {
    if (err) {
        console.error(`error connection: ${err}`);
    }

    console.log('connected!');
    loadProducts();
    
});

const loadProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if(err) throw err;

        console.table(res);
    });
}