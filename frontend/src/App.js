import "./App.css";
import { Route, Routes } from "react-router-dom";

import React, { useEffect } from "react";
import Navigation from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddTask from "./components/AddTask";
import { useNavigate } from "react-router-dom";

//===============================================================

import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn } = useSelector((state) => {
    return { isLoggedIn: state.auth.isLoggedIn };
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path={"/"} element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newTask" element={<AddTask />} />
      </Routes>
    </div>
  );
};

export default App;
