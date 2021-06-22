# E-Commerce-Back-End
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  This is a simple the back end for an e-commerce site using [MySQL2](https://www.npmjs.com/package/mysql2), [Sequelize](https://www.npmjs.com/package/sequelize) and [dotenv](https://www.npmjs.com/package/dotenv) packages.

  ## Table of Contents
  [Installation](#installation)  
    [Usage](#usage)  
    [License](#license)  
    [Contributing](#contributing)  
    [Questions](#questions)  

  ## Installation
  Run ```npm install``` to install the dependencies.

  ## Usage
  Open **MySQL** shell and connect to your server. Run ```CREATE DATABASE ecommerce_db;``` to create the database. Exit the sheel by typing ```exit```.
  Run ```npm run seed``` in the terminal to seed the database.
  Run ```npm start``` to run the app. 
  The database schema has four tables: **Category**, **Product**, **Tag** and **ProductTag**. The API:
   
  ### Categories
  ***GET*** ```{{host}}/api/categories```: Get all categories
  ***GET*** ```{{host}}/api/categories/:id``` Get a category by id 
  ***POST** ```{{host}}/api/categories``` Create a new category  
  Body: 
  ```
    {
    "category_name": "<category_name>"
    }
```
  ***PUT** ```{{host}}/api/categories/:id``` Update a category.   
  Body:
 ```
    {
    "category_name": "<new_category_name>"
    }
```
  ***DELETE*** ```{{host}}/api/categories/:id``` Delete a category.

 ### Products
  ***GET*** ```{{host}}/api/products```: Get all products
  ***GET*** ```{{host}}/api/products/:id``` Get a product by id 
  ***POST** ```{{host}}/api/products``` Create a new product  
  Body: 
  ```
    {
    "product_name": "<product_name>",
    "price": <price>,
    "stock": <stock>,
    "tagIDs": <tagIds> (optional)
    }
```
  ***PUT** ```{{host}}/api/products/:id``` Update a product.   
  Body:
 ```
    {
    "product_name": "<product_name>",
    "price": <price>,
    "stock": <stock>,
    "tagIDs": <tagIds> (optional)
    }
```
  ***DELETE*** ```{{host}}/api/products/:id``` Delete a product.

### Tags
  ***GET*** ```{{host}}/api/tags```: Get all tags
  ***GET*** ```{{host}}/api/tags/:id``` Get a tag by id 
  ***POST** ```{{host}}/api/tags``` Create a new tag  
  Body: 
  ```
    {
    "tag_name": "<tag_name>"
    }
```
  ***PUT** ```{{host}}/api/tags/:id``` Update a tag.   
  Body:
 ```
    {
    "tag_name": "<new_tag_name>"
    }
```
  ***DELETE*** ```{{host}}/api/tags/:id``` Delete a tag.
  
  ## Contributing
  Free to contribute

  ## License
  This project is licensed under the terms of the [MIT](https://opensource.org/licenses/MIT) license.


  ## Questions
  https://github.com/vasylynash  
  For questions and suggestions, contact me at vasylyna.shevadutska@gmail.com.