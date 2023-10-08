const mongoose = require("mongoose");

const tasks = new mongoose.Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", tasks);
