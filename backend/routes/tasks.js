const express = require("express");

const {
  getTasksByUser,
  createNewTask,
  updateTaskById,
  deleteTaskById,
  completTaskById,
} = require("../controllers/tasks");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const tasksRouter = express.Router();

tasksRouter.get("/", authentication, getTasksByUser);

tasksRouter.post(
  "/",
  authentication,
  authorization("CREATE_TASK"),
  createNewTask
);
tasksRouter.put("/:id", authentication, updateTaskById);
tasksRouter.delete("/:id", authentication, deleteTaskById);
tasksRouter.put("/:id/complete", authentication, completTaskById);

module.exports = tasksRouter;
