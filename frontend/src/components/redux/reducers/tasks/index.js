import { createSlice } from "@reduxjs/toolkit";

export const tasks = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskById: (state, action) => {
      state.tasks = state.tasks.map((task, index) => {
        if (action.payload._id === task._id) {
          return action.payload;
        }
        return task;
      });
    },
    deleteTaskById: (state, action) => {
      state.tasks = state.tasks.filter((task, index) => {
        return task._id !== action.payload;
      });
    },
  },
});

export const { setTasks, addTask, updateTaskById, deleteTaskById } =
  tasks.actions;

export default tasks.reducer;
