### Assignment No: 08

# A Book Catalog Backend Server

### Live Link : https://book-catalloge-backend.vercel.app/

<hr>

### Server Description:

This is a book catalog backend server, powered by Express.js , Prisma and postgreSQL for database , serves as the backbone of a digital library or bookstore, enabling efficient management of a diverse collection of books. This server offers a comprehensive set of API endpoints, allowing users to perform actions such as see all books, categories also adding new order, conducting searches, and admin can managing user accounts also create new book, update , delete etc..

It seamlessly integrates with a relational database to store book-related data and leverages Prisma as an ORM to simplify database interactions. Security measures, including authentication, authorization, and data validation, are employed to protect sensitive data and ensure only authorized users access certain functionalities. error handling, logging, and thorough documentation enhance the server's reliability and maintainability. This server facilitates the growth and scalability of the book catalog, making it an essential component for online book-related services.

### Technology Stack:

- TypeScript as the Programming Language.
- Express.js as the web framework.
- Prisma as the Object Relational Mapping (ORM)
- postgreSQL as the database

### Live Link: https://book-catalloge-backend.vercel.app/

## Login

- login for Admin:

  ```json
  {
    "email": "admin1@example.com",
    "password": "john123"
  }
  ```

- login for Customer:

  ```json
  {
    "email": "maruf@example.com",
    "password": "maruf123"
  }
  ```

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/:id (Single GET) Include an id that is saved in your database
- api/v1/users/:id (PATCH)
- api/v1/users/:id (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/:id (Single GET) Include an id that is saved in your database
- api/v1/categories/:id (PATCH)
- api/v1/categories/:id (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)

<br/>
<br/>
