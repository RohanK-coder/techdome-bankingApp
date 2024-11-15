
# MERN-based Banking Application with Loan Request System

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that simulates a banking system where users can sign in, request loans, and interact with an admin who reviews and approves or denies the requests.

Features:
User Authentication: Users can sign in to their account securely using a login system with password encryption and session management via JWT (JSON Web Tokens).

Loan Request System: After logging in, users can apply for loans by providing details such as the loan amount and term. These requests are stored in the database and await approval.

Admin Dashboard: Admins can view all loan requests submitted by users, review the details, and change the status of each loan (e.g., approved, denied).

## Demo

http://13.233.199.127:5173/

## Tech Stack

**Frontend:** React.js (for building dynamic and responsive UI), Axios (for API calls)

**Backend:** Node.js with Express.js (for handling API requests, business logic, and server-side functions)
Database: MongoDB (NoSQL database for storing user data, loan information, and statuses)

**Responsive Design:** Tailwind CSS (for building responsive UI components and layouts), Material Tailwind, daisyUI.


## Run Locally

Clone the project

```bash
  git clone https://github.com/RohanK-coder/techdome-bankingApp.git
```

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```



Install dependencies

```bash
  cd ../backend
```

```bash
  npm install
```
Back to Project Directory

```bash
  cd ..
```
```bash
  chmod +x start.sh (give permissions)
```
```bash
  ./start.sh (to run the script that starts the client and server)
```




## Loan API and User API Documentation

**Base URL** : https://your-api-url.com/api/loans

**Endpoints**

**1. GET /loans**
Fetches all loans.

URL: /loans

Method: GET

Response:

*Status: 200 OK*

**Error Response:**

*Status: 500 Internal Server Error*

{
  "message": "Internal Server Error. Could not fetch loans."
}

**2. GET /loans/**
Fetch a specific loan by its ID.

URL: /loans/:id

Method: GET

URL Params: id (integer) - The ID of the loan to fetch.

**Response:**
*Status: 200 OK*

{
  "id": 1,
  "amount": 5000,
  "term": 12,
  "status": "Pending"
}

**Error Responses:**

*Status: 400 Bad Request*

{
  "message": "Invalid ID format"
}

*Status: 404 Not Found*

{
  "message": "No loan found with ID: 1"
}

*Status: 500 Internal Server Error*

{
  "message": "Internal Server Error. Could not fetch loan."
}

**3. POST /loans/**
Creates a new loan with the provided amount and term.

URL: /loans/:id

Method: POST

URL Params: id (integer) - The ID of the loan.

{
  "amount": 5000,
  "term": 12
}

**Response:**

*Status: 201 Created*

{
  "id": 1,
  "amount": 5000,
  "term": 12,
  "status": "Pending"
}

**Error Responses:**

*Status: 400 Bad Request*

{
  "message": "Invalid loan ID format."
}

*Status: 400 Bad Request*


{
  "message": "Please provide both 'amount' and 'term'."
}

*Status: 500 Internal Server Error*


{
  "message": "Internal Server Error. Could not create loan."
}

**4. PUT /loans/**

/status
Updates the status of a loan to "Accepted" if the loan status is "Pending".

URL: /loans/:id/status

Method: PUT

URL Params: id (string) - The ID of the loan to update.

**Response:**

*Status: 200 OK*

{
  "id": 1,
  "amount": 5000,
  "term": 12,
  "status": "Accepted"
}

**Error Responses:**

*Status: 400 Bad Request*

{
  "message": "Loan with ID 1 is already Accepted."
}

*Status: 404 Not Found*

{
  "message": "No loan found with ID: 1"
}

*Status: 500 Internal Server Error*

{
  "message": "Internal Server Error. Could not update loan status."
}

**Request & Response Format**
Content-Type: application/json

Accept: application/json

*Error Handling*

All errors are returned with the following structure: json


{
  "message": "Error message here"
}

**USER API**

**1. POST /users - Create a new user**
URL: http://localhost:3000/users

Method: POST

Request Body (JSON):json

{
  "id": "user123",
  "password": "securepassword123"
}

**Response:**

*Success (201 Created):json*

{
  "message": "User created successfully.",
  "user": {
    "id": "user123",
    "password": "securepassword123"
  }
}

*Error (400 Bad Request) - Missing fields: json*

{
  "message": "Please provide both 'id' and 'password'."
}

*Error (400 Bad Request) - User already exists: json*

{
  "message": "User with this ID already exists."
}

*Error (500 Internal Server Error): json*

{
  "message": "Internal Server Error. Could not create user."
}

**2. GET /users - Get all users**

URL: http://localhost:3000/users

Method: GET

**Response:**
*Success (200 OK): json*

{
  "message": "Users retrieved successfully.",
  "users": [
    {
      "id": "user123",
      "password": "securepassword123"
    },
    {
      "id": "user456",
      "password": "anotherpassword123"
    }
  ]
}

*Error (404 Not Found) - No users found: json*

{
  "message": "No users found."
}

*Error (500 Internal Server Error): json*

{
  "message": "Internal Server Error. Could not retrieve users."
}

**3. GET /users/**
- Get a user by ID

URL: http://localhost:3000/users/:id

Example: http://localhost:3000/users/user123

Method: GET

**Response: **

*Success (200 OK): json*

{
  "message": "User retrieved successfully.",
  "user": {
    "id": "user123",
    "password": "securepassword123"
  }
}

*Error (404 Not Found) - User not found: json*

{
  "message": "User not found."
}

*Error (500 Internal Server Error): json*


{
  "message": "Internal Server Error. Could not retrieve user."
}

**4. DELETE /users/**

- Delete a user by ID

URL: http://localhost:3000/users/:id

Example: http://localhost:3000/users/user123

Method: DELETE


**Response:**

*Success (200 OK): json*

{
  "message": "User with ID user123 has been deleted.",
  "user": {
    "id": "user123",
    "password": "securepassword123"
  }
}

*Error (404 Not Found) - User not found: json*

{
  "message": "User with ID user123 not found."
}

*Error (500 Internal Server Error): json*


{
  "message": "Internal Server Error. Could not delete user."
}


## Authors

- [@RohanK-coder](https://github.com/RohanK-coder)
