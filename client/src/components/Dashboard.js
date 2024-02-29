import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import ProyectList from "./proyectList";
import { useHistory } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import './styles/Dashboard.css'

const Dashboard = ({ isAuthenticated }) => {
  const history = useHistory();
  const { isSidebarOpen } = useSidebar();

  return (
    <Fragment>
      <h1 style={{ color: 'white', zIndex: 1000, position: 'absolute', top: 0, left: isSidebarOpen ? '23%' : '10%', transition: 'left 0.5s ease' }}>  </h1>
      <Box className={`content ${isSidebarOpen ? 'shifted' : ''}`}
        sx={{
          position: 'fixed',
          top: 90,
          left: isSidebarOpen ? 300 : 100,
          height: 'calc(100% - 90px)',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(20px)',
          borderRight: '2px solid rgba(255, 255, 255, .2)',
          boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
          padding: '6px 14px',
          color: 'white',
          transition: 'left 0.5s ease'
        }}>
        <Typography variant="h5">Proyectos</Typography>
        <Fragment>
          <ProyectList isAuthenticated={isAuthenticated} />
        </Fragment>
      </Box>
    </Fragment>
  );
}

export default Dashboard;

