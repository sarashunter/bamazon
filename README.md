# bamazon
Bamazon is a node command line interface application for inventory management.  It uses a MySQL database to track quantities of items.  It allows users to 'purchase' items and updates the expected quantities.

## Interface
When a user initially opens Bamazon, they are shown the available items, prices, and quantities available and prompted to enter the id of the item they wish to 'purchase.'

![Initial Options Screenshot](/readmeimg/initialscreen.jpeg)

Once the user has chosen their item, they are prompted to request a quantity.  If the quantity is available, the items are 'purchased' and the stock quantity is updated in the database.

![Purchase Screenshot](/readmeimg/successfulpurchase.jpeg)

## Installation
To run this node application, create a local database using the given schema and seeds files for data.  Update the connection within the bamazonCustomer.js file.