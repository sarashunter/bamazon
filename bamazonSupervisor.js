//Requirements
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

    //On connection, check for distinct department names in DB.
    mainMenu();

});

const mainMenu = () => {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View Product Sales by Department', 'Create New Department']
    }]).then(res =>{
        console.log(res);
        if (res.action === 'View Product Sales by Department'){
            showSales();
        }
    })
}

const showSales = () => {
    connection.query('SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales ) AS product_sales, SUM(p.product_sales )-d.over_head_costs AS total_profit FROM departments d JOIN products p ON p.department_name = d.department_name GROUP BY p.department_name;', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}