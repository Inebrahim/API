# Restaurant Management System API

This project is an API for managing a **Restaurant** system where you can handle various operations related to **waiters**, **users**, and **products**. The application allows you to perform CRUD operations like creating, reading, updating, and deleting records of waiters, users, and products in the restaurant. 

## Features

1. **Waiters**: Create, view, update, and delete waiter records.
2. **Users**: Handle customer records, allowing customers to have their favorite items associated with them.
3. **Products**: Manage the restaurant’s products and associate them with users who like specific products.
4. **Joined Product Data**: View the products and their associated users who like them as a favorite.

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Libraries**: 
  - **Express**: Web framework for Node.js
  - **Body-Parser**: To parse incoming request bodies
  - **PostgreSQL**: Database for storing waiter, user, and product data
  - **pg**: PostgreSQL client for Node.js

## API Endpoints

### Waiters
- **POST** `/waiter` - Create a new waiter.
- **GET** `/waiter` - Display all waiters.
- **PUT** `/waiter/:waiterid` - Update an existing waiter by ID.
- **DELETE** `/waiter/:waiterid` - Delete a waiter by ID.

### Users (Customers)
- **POST** `/user` - Create a new user (customer).
- **GET** `/user` - Display all users.
- **PUT** `/user/:userid` - Update an existing user by ID.
- **DELETE** `/user/:userid` - Delete a user by ID.

### Products
- **POST** `/product` - Create a new product and associate it with a user.
- **GET** `/product` - Display all products.
- **PUT** `/product/:userid` - Update an existing product by ID.
- **DELETE** `/product/:productid` - Delete a product by ID.

### Joined Products
- **GET** `/joinedproduct` - Display products and their associated users based on their favorite items.

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/restaurant-management-api.git
```

### 2. Install dependencies
Navigate to the project directory and install the required dependencies:
```bash
cd restaurant-management-api
npm install
```

### 3. Set up PostgreSQL database
- Make sure you have PostgreSQL installed and running on your machine.
- Create a database named `Restraunt` (or modify the `database2.js` file to point to your database).
- Run the SQL queries to set up the `waiter`, `users`, and `products` tables:

```sql
-- For Waiter
CREATE TABLE waiter (
    waiterid SERIAL PRIMARY KEY,
    name VARCHAR(255),
    branch VARCHAR(255)
);

-- For User
CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(255),
    favoriteitem INTEGER REFERENCES products(productid)
);

-- For Product
CREATE TABLE products (
    productid SERIAL PRIMARY KEY,
    productname VARCHAR(255),
    userid INTEGER REFERENCES users(userid)
);
```

### 4. Configure Database Connection
Ensure that the **PostgreSQL** connection details in the `database2.js` file are correct:

```js
const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'your_password',
  database: 'Restraunt',
});

module.exports = client;
```

### 5. Start the server
Run the following command to start the server:
```bash
node index.js
```
The server will be running on **http://localhost:5000**.

### 6. Test the API
You can now test the API by using tools like **Postman** or **curl** to make requests to the various endpoints. Below are the example requests:

#### Create a Waiter (POST)
```json
POST http://localhost:5000/waiter
{
  "name": "John Doe",
  "branch": "Downtown"
}
```

#### Get All Waiters (GET)
```json
GET http://localhost:5000/waiter
```

#### Update a Waiter (PUT)
```json
PUT http://localhost:5000/waiter/1
{
  "name": "Jane Doe",
  "branch": "Uptown"
}
```

#### Delete a Waiter (DELETE)
```json
DELETE http://localhost:5000/waiter/1
```

### Example API Flow for Users and Products
#### Create a User (POST)
```json
POST http://localhost:5000/user
{
  "username": "Alice",
  "favoriteitem": 2
}
```

#### Display All Users (GET)
```json
GET http://localhost:5000/user
```

#### Create a Product (POST)
```json
POST http://localhost:5000/product
{
  "productname": "Pizza",
  "productid": 1,
  "userid": 1
}
```

#### View Joined Products (GET)
```json
GET http://localhost:5000/joinedproduct
```

## Folder Structure

```
/project-root
  ├── /database2.js            # Database connection configuration
  ├── /index.js                # Server connection and routing setup
  ├── /Routesuser.js           # API routes for waiter, user, product management
  ├── /Controller2/Waiter.js   # Business logic for CRUD operations on waiter, user, and product
  ├── /node_modules            # Node.js dependencies
  ├── /package.json            # Project dependencies and scripts
  └── /README.md               # This README file
```

## Acknowledgments
- PostgreSQL for storing data.
- Express.js for building the API.
- Node.js for backend logic.

---

This README should provide clear instructions on how to run your project, test your API, and understand the purpose of the endpoints.
