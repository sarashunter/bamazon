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
        choices: ['View Product Sales by Department', 'Create New Department', 'Quit']
    }]).then(res => {

        if (res.action === 'View Product Sales by Department') {
            showSales();
        } else if (res.action === 'Create New Department') {
            createDept();
        } else {
            console.log("Have a nice day.");
            process.exit(0);
        }
    })
}

const showSales = () => {
    connection.query('SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales ) AS product_sales, SUM(p.product_sales )-d.over_head_costs AS total_profit FROM departments d LEFT JOIN products p ON p.department_name = d.department_name GROUP BY p.department_name;', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

const createDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?'
        },
        {
            type: 'input',
            name: 'over_head_costs',
            message: 'What are the overhead costs for the department?',
            validate: val => !isNaN(val)
        }
    ]).then(res => {
        connection.query('INSERT INTO departments(department_name, over_head_costs) VALUES (?, ?)', [res.department_name, res. over_head_costs], (err, res) => {
            if (err) throw err;
            console.log('Department added');
            mainMenu();
        }
        )
    })
}