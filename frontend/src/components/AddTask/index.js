import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
//=========================Redux======================================
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../redux/reducers/tasks";

const AddTask = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
  });

  const history = useNavigate();

  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const createNewTask = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://test-b4i8.onrender.com/tasks",
        { task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage("The task has been created successfully");
        dispatch(addTask(result.data.result));
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================

  useEffect(() => {
    if (!isLoggedIn) {
      history("/login");
    }
  });

  //===============================================================
  return (
    <>
      <form onSubmit={createNewTask}>
        <br />
        <input
          type="text"
          placeholder="setTask title here"
          onChange={(e) => setTask(e.target.value)}
        />
        <br />

        <br />
        <button>Create New Task</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default AddTask;
