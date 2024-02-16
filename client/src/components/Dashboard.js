import React, { Fragment } from "react";
import ProyectList from "./proyectList"


const Dashboard = ({isAuthenticated})=> {
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <ProyectList isAuthenticated={isAuthenticated}/>
    </Fragment>
  )
}

export default Dashboard;