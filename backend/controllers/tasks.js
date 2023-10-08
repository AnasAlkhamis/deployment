const tasksModel = require("../models/tasks");

const getTasksByUser = (req, res) => {
  const user_id = req.token.userId;

  tasksModel
    .find({ user_id: user_id })
    .then((results) => {
      if (!results.length) {
        return res.status(404).json({
          success: false,
          message: `The user: ${user_id} has no tasks`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the tasks for the user: ${user_id}`,
        results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const createNewTask = (req, res) => {
  const { task } = req.body;
  const user_id = req.token.userId;
  const newTask = new tasksModel({
    task,
    user_id,
  });

  newTask
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `task created`,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updateTaskById = (req, res) => {
  const _id = req.params.id;
  const { completed, task } = req.body;

  tasksModel
    .findByIdAndUpdate(_id, { completed, task }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Task with id: ${_id} is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Task updated`,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteTaskById = (req, res) => {
  const _id = req.params.id;
  tasksModel
    .findByIdAndDelete(_id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Task with id: ${_id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Task deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const completTaskById = (req, res) => {
  const _id = req.params.id;
  const { completed } = req.body;
  tasksModel
    .findByIdAndUpdate(_id, { completed: completed })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The task is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: ` Taks with id: ${_id} completed to ${completed}`,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  getTasksByUser,
  createNewTask,
  updateTaskById,
  deleteTaskById,
  completTaskById,
};
