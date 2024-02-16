import React, { Fragment, useState, useEffect } from "react";
import './App.css';
import Menu from "./components/Navbar";
import {Container} from "@mui/material";

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


function App(){
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return <Fragment>
    <Router>
      <Menu />
        <Switch>
        <Container>
          <Route exact path="/login" render={props => !isAuthenticated ? (
          <Login {...props} setAuth={setAuth} /> ) : ( <Redirect to="/dashboard" /> ) } />

          <Route exact path="/register" render={props => !isAuthenticated ? (
          <Register {...props} setAuth={setAuth} /> ) : ( <Redirect to="/login" /> ) } />

          <Route exact path="/dashboard" render={props => isAuthenticated ? (
          <Dashboard {...props} setAuth={setAuth} /> ) : ( <Redirect to="/login" /> ) } />  

          <Route path="/proyects/new" render={(props) => <ProyectForm {...props} />} />

          </Container>
        </Switch>
      </Router>
  </Fragment>
};
export default App;