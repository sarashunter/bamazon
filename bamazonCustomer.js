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
    loadProducts();
    
});

const loadProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if(err) throw err;

        console.table(res);
        promptCustomerForItem(res);
    });
}

const promptCustomerForItem = inventory =>{
    inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
        validate: val => !isNaN(val) || val.toLowerCase() === "q"
      }
    ])
    .then(val => {
      // Check if the user wants to quit the program
      checkIfShouldExit(val.choice);
      const choiceId = parseInt(val.choice);
      const product = checkInventory(choiceId, inventory);

      // If there is a product with the id the user chose, prompt the customer for a desired quantity
      if (product) {
        // Pass the chosen product to promptCustomerForQuantity
        promptCustomerForQuantity(product);
      }
      else {
        // Otherwise let them know the item is not in the inventory, re-run loadProducts
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
} 

const checkIfShouldExit = choice => {

    if (choice.toLowerCase() === 'q'){
        console.log("Have a nice day");
        process.exit(0);
    }
}

const checkInventory = (choiceId, inventory) => {
    const item = inventory.filter(item => item.item_id === choiceId);
    return item.length > 0 ? item[0] : null;
}

const promptCustomerForQuantity = product => {
    inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: val =>
           val > 0 || val.toLowerCase() === "q"
      }
    ])
    .then(val => {
      // Check if the user wants to quit the program
      checkIfShouldExit(val.quantity);
      const quantity = parseInt(val.quantity);

      // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        // Otherwise run makePurchase, give it the product information and desired quantity to purchase
        makePurchase(product, quantity);
      }
    });
}

const makePurchase = (product, quantity) => {
    const thisSale = product.price * quantity;
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ?  WHERE item_id = ?",
        [quantity, thisSale, product.item_id],
        function(err, res) {
          // Let the user know the purchase was successful, re-run loadProducts
          console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
          loadProducts();
        }
      );
      
}