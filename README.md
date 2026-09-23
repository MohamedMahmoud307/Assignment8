طبعًا. ده **README احترافي لكن طبيعي وبسيط**، بصياغة طالب Backend عامل المشروع بنفسه، من غير كلام تسويقي أو جمل تبان AI-generated.

انسخ الرسالة دي كاملة وحطها في `README.md`:

````markdown
# Assignment 8 - MongoDB Notes API

A REST API built with Node.js, Express.js, MongoDB, and Mongoose.

The project handles users and notes and includes CRUD operations, validation, pagination, sorting, population, and MongoDB aggregation.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- Postman
- Git & GitHub

## Project Structure

```text
Assignment8
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── models
│   │   ├── user.model.js
│   │   └── note.model.js
│   │
│   ├── controllers
│   │   ├── user.controller.js
│   │   └── note.controller.js
│   │
│   ├── routes
│   │   ├── user.routes.js
│   │   └── note.routes.js
│   │
│   └── app.js
│
├── bonus.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
````

## Features

### User

* Signup
* Login
* Get user by ID
* Update user
* Delete user
* Delete user's notes when the user is deleted
* Check for duplicate email

### Notes

* Create note
* Update note
* Replace note
* Update all note titles
* Delete a note
* Delete all notes
* Get note by ID
* Get note by content
* Pagination
* Sorting
* Populate user information
* MongoDB aggregation
* User ownership validation

### Validation

* User email must be unique
* User age must be between 18 and 60
* Note title is required
* Note content is required
* Note title cannot be completely uppercase

## Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Move to the project folder:

```bash
cd Assignment8
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/assignment8
```

## Run the Project

Start the server:

```bash
npm start
```

Or:

```bash
node server.js
```

The server will run on:

```text
http://localhost:3000
```

## API Endpoints

### User Routes

Base URL:

```text
http://localhost:3000/users
```

#### Signup

```http
POST /users/signup
```

Example body:

```json
{
  "name": "Mohamed Mahmoud",
  "email": "mohamed@example.com",
  "password": "123456",
  "phone": "01000000000",
  "age": 21
}
```

#### Login

```http
POST /users/login
```

Example body:

```json
{
  "email": "mohamed@example.com",
  "password": "123456"
}
```

#### Get User

```http
GET /users?id=USER_ID
```

#### Update User

```http
PATCH /users/:id
```

Example:

```http
PATCH /users/USER_ID
```

Example body:

```json
{
  "name": "Mohamed Ali",
  "phone": "01111111111",
  "age": 22
}
```

#### Delete User

```http
DELETE /users?id=USER_ID
```

This also deletes all notes that belong to the user.

---

## Note Routes

Base URL:

```text
http://localhost:3000/notes
```

#### Create Note

```http
POST /notes?id=USER_ID
```

Example body:

```json
{
  "title": "Node.js Study",
  "content": "Study Node.js today"
}
```

#### Update Note

```http
PATCH /notes/:noteId?id=USER_ID
```

Example body:

```json
{
  "title": "Updated Node.js Study",
  "content": "I updated my Node.js note"
}
```

#### Replace Note

```http
PUT /notes/replace/:noteId?id=USER_ID
```

Example body:

```json
{
  "title": "New Note Title",
  "content": "New note content"
}
```

#### Update All Note Titles

```http
PATCH /notes/all?id=USER_ID
```

Example body:

```json
{
  "title": "Updated Title"
}
```

#### Delete Note

```http
DELETE /notes/:noteId?id=USER_ID
```

#### Pagination and Sorting

```http
GET /notes/paginate-sort?id=USER_ID&page=1&limit=3
```

Notes are sorted by creation date.

#### Get Note by ID

```http
GET /notes/:id?id=USER_ID
```

#### Get Note by Content

```http
GET /notes/note-by-content?id=USER_ID&content=CONTENT
```

#### Get Notes with User Information

```http
GET /notes/note-with-user?id=USER_ID
```

This endpoint uses Mongoose `populate()` to return the user's email with the notes.

#### Aggregation

```http
GET /notes/aggregate?id=USER_ID
```

Aggregation can also be filtered by title:

```http
GET /notes/aggregate?id=USER_ID&title=Node
```

The aggregation uses:

* `$match`
* `$lookup`
* `$unwind`
* `$project`

#### Delete All Notes

```http
DELETE /notes?id=USER_ID
```

## Data Models

### User

```text
name
email
password
phone
age
createdAt
updatedAt
```

### Note

```text
title
content
userId
createdAt
updatedAt
```

The `userId` field references the `User` model.

```javascript
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
```

## Bonus

The bonus solution is available in:

```text
bonus.js
```

It solves the Longest Common Prefix problem.

Example:

```javascript
longestCommonPrefix(["flower", "flow", "flight"]);
```

Output:

```text
fl
```

Run it with:

```bash
node bonus.js
```

## Testing

The API was tested using Postman.

The main operations include:

* User signup and login
* User update and delete
* Note creation
* Note update and replacement
* Note deletion
* Pagination and sorting
* Searching by content
* Population
* Aggregation
* Deleting all notes

When testing, replace `USER_ID` and `NOTE_ID` with valid MongoDB ObjectIds.

## Git

Initialize the repository:

```bash
git init
```

Add the files:

```bash
git add .
```

Commit the project:

```bash
git commit -m "Complete Assignment 8"
```

Add the GitHub repository:

```bash
git remote add origin <YOUR_REPOSITORY_URL>
```

Set the main branch:

```bash
git branch -M main
```

Push the project:

```bash
git push -u origin main
```

## Notes

The `.env` file and `node_modules` folder should not be pushed to GitHub.

The `.gitignore` file contains:

```text
node_modules/
.env
```

## Author

Mohamed Mahmoud

```
```
