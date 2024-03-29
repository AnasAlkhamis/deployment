const express = require("express");

// Import login controller
const { login } = require("../controllers/login");

// Create login router
const loginRouter = express.Router();

/*
 * Testing Routes:
 * POST -> https://test-npw8.onrender.com/login/
*/

/*
 * Testing Object:
{
  "email":"Jouza@hotmail.com",
  "password": "123456"
}
*/

loginRouter.post("/", login);

module.exports = loginRouter;
