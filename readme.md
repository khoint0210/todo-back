# Todo Backend
> RESTful API for Todo app using Express and MongoDB. https://innoteq-todo.herokuapp.com/

## Installation
* Install [MongoDB](https://www.mongodb.com/download-center#community), start mongod service.
* Install [NodeJS](https://nodejs.org).
* Use `yarn` instead of `npm` if you want, I love [Yarn](https://yarnpkg.com).
* Clone project, execute `npm install` or `yarn` to install dependencies.
* To run on development environment, execute `npm run dev` or `yarn dev`.
* To build project for production, execute `npm run build` or `yarn build`.
* Import postman file to your [postman app](https://www.getpostman.com/) for testing the APIs.

## Endpoints
The app include 4 endpoint for CRUD tasks of todo app.

* `GET /` - Get all tasks.
* `POST /` - Create new task.
* `PATCH /:id` - Update a task.
* `DELETE /:id` - Delete a task.

More detail about `body` or `result` of API you can directly try using Postman.
