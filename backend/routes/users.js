const express = require("express");
const { register } = require("../controllers/users");

// define router
const usersRouter = express.Router();

/*
 * Testing Routes:
 * POST -> https://test-b4i8.onrender.com/users/
*/

/*
 * Testing Object:
{
  "firstName": "Mhmd",
  "lastName": "Jouza",
  "age": 27,
  "country": "Jordan",
  "email":"Jouza@hotmail.com",
  "password": "123456",
  "role":"61d03786a0848857b2c15026"
}
*/

usersRouter.post("/", register);

module.exports = usersRouter;
