# Express PostgreSQL API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

A robust RESTful API built with Express.js and PostgreSQL, providing CRUD operations for managing blog posts.

## Features

- CRUD Operations: Create, Read, Update, and Delete blog posts
- PostgreSQL Integration: Robust database management using node-postgres
- Environment Configuration: Secure configuration using dotenv
- Error Handling: Comprehensive error management and logging
- Scalable Architecture: Designed for easy scaling and maintenance

## Prerequisites

- Node.js 
- npm 
- PostgreSQL 
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/express-pg-api.git
   cd express-pg-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
    OR
    ```bash
   npm i
   ```

## Configuration

1. Create a `.env` file in the root directory with the following content:
   ```
   PORT=your PORT
   DB_USER=database username
   DB_HOST=localhost
   DB_NAME=Database name (ex:my-DB)
   DB_PASSWORD=your database password
   DB_PORT=your database port
   ```

2. Adjust the values according to your environment.

## Database Setup


1. Create the database:
   ```sql
   CREATE DATABASE "db-name";
   ```

4. Create a `posts` table :
   ```sql
   CREATE TABLE posts (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     content TEXT NOT NULL,
     author VARCHAR(255) NOT NULL,
     date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Usage

Start the server ( Here nodemon is required ) :
```bash
nodemon server.js
```

The API will be available at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint    | Description               |
|--------|-------------|---------------------------|
| GET    | /posts      | Retrieve all posts        |
| GET    | /posts/:id  | Retrieve a specific post  |
| POST   | /posts      | Create a new post         |
| PATCH  | /posts/:id  | Update a specific post    |
| DELETE | /posts/:id  | Delete a specific post    |

## Example Requests

Here are some example requests you can run in Postman:

### Create a Post
- Method: POST
- URL: `http://localhost:3000/posts`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "title": "My First Post",
    "content": "This is the content of my first post",
    "author": "John Doe"
  }
  ```

### Get All Posts
- Method: GET
- URL: `http://localhost:3000/posts`

### Get a Specific Post
- Method: GET
- URL: `http://localhost:3000/posts/1`

### Update a Post
- Method: PATCH
- URL: `http://localhost:3000/posts/1`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "title": "Updated Title"
  }
  ```

### Delete a Post
- Method: DELETE
- URL: `http://localhost:3000/posts/1`

## Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of an API request:

- 200: Success
- 201: Created (For POST requests)
- 204: No Content (For successful DELETE requests)
- 404: Not Found
- 500: Server Error

If an error occurs, the API will return a JSON object with a `message` field describing the error.

## License

This project is open source and available under the [MIT License](LICENSE).
