import React, { Fragment, useState, useEffect } from "react";
import './App.css';
import Menu from "./components/Navbar";
import { Container } from "@mui/material";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProyectForm from "./components/ProyectForm";
import ProyectList from "./components/proyectList";
import ProyectDashboard from "./components/ProyectDashboard";
import TaskForm from "./components/TaskForm";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const res = await fetch("http://localhost:5000/authentication/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.token}` }
        });

        const parseRes = await res.json();

        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    checkAuthenticated();
  }, []);

  return <Fragment>
    <Router>
      {isAuthenticated && <Menu setAuth={setAuth} />}
      <Switch>
        <Container>
          <Route exact path="/" render={() => !isAuthenticated ? (<Redirect to="/login" />) : (<Redirect to="/dashboard" />)} />

          <Route exact path="/login" render={props => !isAuthenticated ? (
            <Login {...props} setAuth={setAuth} />) : (<Redirect to="/dashboard" />)} />

          <Route exact path="/register" render={props => !isAuthenticated ? (
            <Register {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)} />

          <Route exact path="/dashboard" render={props => isAuthenticated ? (
            <Dashboard {...props} isAuthenticated={isAuthenticated} />) : (<Redirect to="/login" />)} />

          <Route path="/proyect/new" render={(props) => <ProyectForm {...props} />} />

          <Route exact path="/proyects" render={props => isAuthenticated ? (
            <ProyectList {...props} isAuthenticated={isAuthenticated} />) : (<Redirect to="/login" />)} />

          <Route path="/proyects/:id" render={(props) => <ProyectDashboard {...props} />} />

          <Route path="/proyects/:id/task/new" render={(props) => <TaskForm {...props} />} />

        </Container>
      </Switch>
    </Router>
  </Fragment>
};
export default App;