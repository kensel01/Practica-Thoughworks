import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

const ProyectDashboard= ()=> {
    const { id } = useParams();
    return (
      <Fragment>
        <h1 style={{color: '#535878'}}>Proyecto{id}</h1>
      </Fragment>
    )
  }
  
  export default ProyectDashboard;