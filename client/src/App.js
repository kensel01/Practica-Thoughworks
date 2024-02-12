import React, { Fragment, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/login">
              {!isAuthenticated ? <Login setAuth={setAuth} /> : <Redirect to="/dashboard" />}
            </Route>
            <Route exact path="/register">
              {!isAuthenticated ? <Register setAuth={setAuth} /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/dashboard"> 
              {isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Redirect to="/login" />}
              
            </Route>
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;