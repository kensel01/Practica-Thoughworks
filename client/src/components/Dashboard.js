import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import ProyectList from "./proyectList";
import { useSidebar } from '../contexts/SidebarContext';
import './styles/Dashboard.css'

const Dashboard = ({ isAuthenticated }) => {

  const { isSidebarOpen } = useSidebar();

  return (
    <Fragment>
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
          transition: 'left 0.5s ease',
          overflowY: 'auto'
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

