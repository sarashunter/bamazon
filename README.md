# bamazon
Bamazon is a node command line interface application for inventory management.  It uses a MySQL database to track quantities of items.  It allows users to 'purchase' items and updates the expected quantities.

There are three views built in for different users: Customer, Manager, and Supervisor.

## Installation
To run this node application, create a local database using the given schema and seeds files for data.  Update the connection within each of the bamazon.js files.  Install the modules required in the package.json using NPM.

## Customer Interface
When a customer initially opens Bamazon, they are shown the available items, prices, and quantities available and prompted to enter the id of the item they wish to 'purchase.'

![Initial Options Screenshot](/readmeimg/initialscreen.jpeg)

Once the user has chosen their item, they are prompted to request a quantity.  If the quantity is available, the items are 'purchased' and the stock quantity is updated in the database.

![Purchase Screenshot](/readmeimg/successfulpurchase.jpeg)

## Manager Interface
When a manager initially opens Bamazon, they are given five choices.

![Initial Manager Options Screenshot](/readmeimg/managerinitial.jpeg)

They can view the products for sale just like a customer.

They can also choose to see which items have fewer than 5 in stock, so they know what to order.

![Manager Low Inventory Screenshot](/readmeimg/managerlow.jpeg)

They are also able to add more of a given item to inventory and create new products.

![Manager Add Products Screenshot](/readmeimg/manageradd.jpeg)

## Supervisor Interface

Supervisors are able to view product sales and create new departments.

![Supervisor Initial Menu Screenshot](/readmeimg/supervisorinitial.jpeg)

Supervisors are able to see the profit margins for each department with the over head costs taken into consideration.

![Supervisor Product Sales Screenshot](/readmeimg/supervisorprofit.jpeg)