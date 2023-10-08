const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Import Routers
const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const rolesRouter = require("./routes/roles");

app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/login", loginRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
