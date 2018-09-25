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
    updateInventoryArray([]);

});

const updateInventoryArray = (inventory) =>{
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;

        managerMenu(res);
    });
}

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

        switch (res.mainmenu) {
            case 'View Products for Sale':
                viewProducts(inventory);
                break;

            case 'View Low Inventory':
                viewLowInventory(inventory);
                break;

            case 'Add to Inventory':
                addInventory(inventory);
                break;
        }
    })
}

const viewProducts = inventory => {
    console.table(inventory);
    managerMenu(inventory);
}

const viewLowInventory = inventory => {
    const lowitems = inventory.filter(item => item.stock_quantity < 5);
    console.table(lowitems);
    managerMenu(inventory);
}

const addInventory = inventory => {
    console.table(inventory);

    inquirer.prompt([{
        type: 'list',
        name: 'itemid',
        message: 'Choose the item id of the item you would to add to inventory',
        choices: inventory.map(item => item.item_id.toString())
    }]).then(res => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to add?',
                validate: val => !isNaN(val) || val.toLowerCase() === "q"
            }
        ]).then(quant => {
            console.log('You added ' + quant.quantity);
            console.log('id ' + res.itemid
            )
            connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [quant.quantity, res.itemid], (err, res) => {
                if (err) throw err;
                console.log('here');
                updateInventoryArray(inventory);
            });
        })
    })
}