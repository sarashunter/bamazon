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

    // console.log('connected!');

    //Copy products to an array for quick access.
    connection.query("SELECT * FROM products", (err, res) => {
        if(err) throw err;

        managerMenu(res);
    });

});

const managerMenu = (inventory) => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainmenu',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            message: 'What would you like to do?'
        }
    ]).then(res => {
        console.log(res);

        switch (res.mainmenu){
            case 'View Products for Sale':
            viewProducts(inventory);
            break;

            case 'View Low Inventory':
            viewLowInventory(inventory);
            break;


        }
    })
}

const viewProducts = inventory =>{
    console.table(inventory);
    mainmenu(inventory);
}

const viewLowInventory = inventory =>{
    const lowitems = inventory.filter(item => item.stock_quantity < 10);
    console.table(lowitems);
    mainmenu(inventory);
}