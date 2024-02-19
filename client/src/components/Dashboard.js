import React, { Fragment, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ProyectList from "./proyectList";
import { jwtDecode } from 'jwt-decode'; 
import { CgProfile } from "react-icons/cg";

const Dashboard = ({ isAuthenticated }) => {
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
    <Box sx={{ bgcolor: 'white', height: '100vh', display: 'flex', flexDirection: 'column', width: '80vw' }}>
  <Box sx={{ position: 'relative', display: 'flex' }}>
    <Box sx={{ 
      bgcolor: '#6A0DAD',
      width: '10px',
      height: '100%',
      position: 'absolute',
      left: 0,
    }} />
    <Box sx={{ 
      bgcolor: '#E1AFF7', 
      color: 'white',
      padding: '30px',
      borderBottomRightRadius: '10px', 
      borderBottomLeftRadius: '10px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      flex: 1
    }}>
      <Typography variant="h5">Proyectos</Typography>
      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
        <CgProfile style={{ fontSize: '30px', marginRight: '8px', verticalAlign: 'middle' }} />
        {userInfo.user_name}
      </Typography>
    </Box>
  </Box>
  <Fragment>
    <ProyectList isAuthenticated={isAuthenticated} />
  </Fragment>
</Box>
  )
}

export default Dashboard;