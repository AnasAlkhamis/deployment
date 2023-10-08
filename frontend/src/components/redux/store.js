import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import tasksReducer from "./reducers/tasks";

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});
