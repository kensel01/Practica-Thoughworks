import React, { Fragment, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ProyectList from "./proyectList";
import { jwtDecode } from 'jwt-decode'; 
import { useHistory } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext'; // Import useSidebar

import './styles/Dashboard.css'


const Dashboard = ({ isAuthenticated, setAuth }) => {
  const history = useHistory();
  const { isSidebarOpen } = useSidebar(); // Use useSidebar to access isSidebarOpen
  const [userInfo, setUserInfo] = useState({});
  
  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        const userData = await response.json();
        if (response.ok) {
          setUserInfo(userData);
          console.log(userData); // Added console.log to check user data
        } else {
          console.error('Error fetching user info');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [isAuthenticated]);
  
  

  return (
    <Fragment>
    <h1 style={{ color: 'white', zIndex: 1000, position: 'absolute', top: 0, left: isSidebarOpen ? '23%' : '10%',transition:'left 0.5s ease' }}> Bienvenido {userInfo.name ? userInfo.name : ''} </h1>
    <Box className={`content ${isSidebarOpen ? 'shifted' : ''}`}
      sx={{
        position: 'fixed',
        top: 90,
        left: isSidebarOpen ? 300 : 100,
        height: 'calc(100% - 90px)', 
        backgroundColor: 'transparent',
        backdropFilter: 'blur(40px)',
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

export default Dashboard
