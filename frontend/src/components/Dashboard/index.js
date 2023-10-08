import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
//===========================Redux====================================
import {
  setTasks,
  updateTaskById,
  deleteTaskById,
} from "../redux/reducers/tasks";

import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token, tasks } = useSelector((state) => {
    return {
      token: state.auth.token,
      tasks: state.tasks.tasks,
    };
  });
  const [task, setTask] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [updateBox, setUpdateBox] = useState(false);
  const [message, setMessage] = useState("");
  //===============================================================

  const getAllTasks = async () => {
    try {
      const res = await axios.get("https://test-npw8.onrender.com/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setTasks(res.data.results));
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage("No tasks to show");
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  const handleUpdateClick = (task) => {
    setUpdateBox(!updateBox);
    setTaskId(task._id);
    setTask(task.task);
    setCompleted(task.completed);
    if (updateBox) updateTask(task._id);
  };
  //===============================================================

  const updateTask = async (id) => {
    try {
      const res = await axios.put(
        `https://test-npw8.onrender.com/tasks/${id}`,
        {
          task,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(updateTaskById(res.data.result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`https://test-npw8.onrender.com/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(deleteTaskById(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  useEffect(() => {
    if (tasks.length === 0) {
      getAllTasks();
    }
  }, []);

  //===============================================================

  return (
    <>
      <br />
      {tasks?.map((task, index) => (
        <div key={index} className="tasks">
          <div>{task.task}</div>
          <div>{!task.completed ? "not complete" : "completed"}</div>
          <>
            {updateBox && taskId === task._id && (
              <form>
                <br />
                <input
                  type="text"
                  defaultValue={task.task}
                  placeholder="task here"
                  onChange={(e) => setTask(e.target.value)}
                />
                <div>
                  <label htmlFor="complete">Done: </label>
                  <input
                    type="radio"
                    checked={completed ? true : false}
                    name="complete"
                    onChange={(e) => setCompleted(true)}
                  />
                  <br />
                  <label htmlFor="complete">Not Yet: </label>
                  <input
                    checked={!completed ? true : false}
                    type="radio"
                    name="complete"
                    onChange={(e) => setCompleted(false)}
                  />
                </div>
              </form>
            )}
            <button className="delete" onClick={() => deleteTask(task._id)}>
              X
            </button>
            <button className="update" onClick={() => handleUpdateClick(task)}>
              Update
            </button>
          </>
        </div>
      ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
