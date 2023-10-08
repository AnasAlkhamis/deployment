const express = require("express");

// Import roles controller
const { createNewRole } = require("../controllers/roles");

// Create roles router
const rolesRouter = express.Router();

/*
 * Testing Routes:
 * POST -> https://test-b4i8.onrender.com/roles/
*/

/*
 * Testing Object:

{
  "role": "ADMIN",
  "permissions": ["CREATE_TASK"]
}
*/

rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
