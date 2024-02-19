import React, { Fragment } from "react";
import ProyectList from "./proyectList";
import { useParams } from "react-router-dom";



const Dashboard = ({isAuthenticated})=> {
  const { id } = useParams();
  return (
    <Fragment>
      <h1 style={{color: '#535878'}}>Bienvenido {id}</h1>
      <ProyectList isAuthenticated={isAuthenticated}/>
    </Fragment>
  )
}

export default Dashboard;