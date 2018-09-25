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
    }]).then((err, res) =>{
        if (res.action === 'View Product Sales by Department'){
            showSales();
        }
    })
}

// const showSales = () => {
//     connection.query
// }