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
    getExistingDepts();

});

//Copy items from the db to an array for quick access.
const updateInventoryArray = (inventory, depts) => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;

        managerMenu(res, depts);
    });
}

const managerMenu = (inventory, depts) => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'mainmenu',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit'],
            message: 'What would you like to do?'
        }
    ]).then(res => {

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

            case 'Add New Product':
                addProduct(inventory, depts);
                break;
            case 'Quit':
                checkIfShouldExit('q'); //Uses q to trigger an exit.
                break;
        }
    })
}

//Console logs the products as a table.
const viewProducts = inventory => {
    console.table(inventory);
    managerMenu(inventory);
}

//Console logs the products with stock quantity below 5 as a table.
const viewLowInventory = inventory => {
    const lowitems = inventory.filter(item => item.stock_quantity < 5);
    console.table(lowitems);
    managerMenu(inventory);
}

//Adds to the stock quantity of a given item.
const addInventory = inventory => {
    console.table(inventory);

    inquirer.prompt([{
        type: 'list',
        name: 'itemid',
        message: 'Choose the item id of the item you would to add to inventory',
        choices: inventory.map(item => item.item_id.toString())
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to add? [Quit with Q]',
        validate: val => !isNaN(val) || val.toLowerCase() === "q"
    }
    ]).then(res => {
        console.log('You added ' + res.quantity);

        connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [res.quantity, res.itemid], (err, res) => {
            if (err) throw err;

            updateInventoryArray(inventory);
        });
    });
}

//Allows the user to add a product to the database.
const addProduct = (inventory, depts) => {
    console.log(depts);
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'What is the name of the product?'
        },
        {
            type: 'list',
            name: 'department_name',
            message: 'What department sells the item?',
            choices: depts
        },
        {
            type: 'input',
            name: 'price',
            message: 'What is the price of an item?',
            validate: val => !isNaN(val)
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'What quantity do you have? [Quit with Q]',
            validate: val => !isNaN(val) || val.toLowerCase() === "q"
        }
    ]).then(res => {
        checkIfShouldExit(res.stock_quantity);

        connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES (?, ?,?, ?)", [res.product_name, res.department_name, res.price, res.stock_quantity], (err, response) => {
            if (err) throw err;

            console.log(`
${res.stock_quantity} ${res.product_name} added to inventory.
            `)
            updateInventoryArray(inventory);
        })
    })
}

//Run at the beginning to get the distinct departments in case the user wishes to add an item.
const getExistingDepts = () => {

    connection.query("SELECT DISTINCT department_name FROM products", (err, res) => {
        const result = res.map(item => item.department_name);

        updateInventoryArray([], result);
    });
}

//Used to check if the user wants to exit.
const checkIfShouldExit = choice => {

    if (choice.toLowerCase() === 'q') {
        console.log("Have a nice day.");
        process.exit(0);
    }
}
