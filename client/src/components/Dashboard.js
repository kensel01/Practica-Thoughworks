import React, { Fragment, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ProyectList from "./proyectList";
import { jwtDecode } from 'jwt-decode'; 
import { useHistory } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { AiOutlinePicCenter } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import './styles/Dashboard.css'


const Dashboard = ({ isAuthenticated, setAuth }) => {
  const history = useHistory();

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
  
  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    history.push('/login');
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <nav className="sidebar">
      <div className="logo-menu">
        <h2 className="logo">
          <CgProfile style={{ fontSize: '30px', marginRight: '8px', verticalAlign: 'middle' }} /> 
          <span className="username">{userInfo.user_name}</span>
        </h2>
          <i className="bx bx-menu toggle-btn" onClick={toggleSidebar}>
            <IoMdMenu />
          </i>
      </div>
        <ul className="list">
          <li className="list-item active ">
            <a href="#">
              <i className='bx bx-grid-alt'>
                <MdOutlineDashboard/>
              </i>
              <span className="link-name" style={{ '--i': 1 }}> Dashboard </span>
            </a>
          </li>

          <li className="list-item ">
            <a href="#">
              <i className="bx bx-grid-alt">
                <AiOutlineFundProjectionScreen />
              </i>
              <span className="link-name" style={{ '--i': 2 }}> Proyectos </span>
            </a>
          </li>

          <li className="list-item">
            <a onClick={()=> history.push('/proyect/:proyectId/epic/:epicId/tasks')}>
              <i className="bx bx-grid-alt">
                <FaTasks />
              </i>
              <span className="link-name" style={{ '--i': 3 }}> Tareas </span>
            </a>
          </li>

          <li className="list-item">
            <a href="#" >
            <i className="bx bx-grid-alt">
              <AiOutlinePicCenter />
              </i>
              <span className="link-name" style={{ '--i': 4 }}> Epicas </span>
            </a>
          </li>

          <li className="list-item">
            <a href="#">
            <i className="bx bx-grid-alt">
              <FaCalendarAlt />
              </i>
              <span className="link-name" style={{ '--i': 5 }}> Calendario </span>
            </a>
          </li>

          <li className="list-item">
            <a href="#" onClick={handleLogout}>
              <i className="bx bx-grid-alt">
                <CiLogout />
              </i>
              <span className="link-name" style={{ '--i': 6 }}> Cerrar Sesión </span>
            </a>
          </li>

        </ul>
      </nav>

      <Box sx={{ position: 'fixed',
        top: 90,
        left: 350,
        height: '100%',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(40px)',
        borderRight: '2px solid rgba(255, 255, 255, .2)',
        boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
        padding: '6px 14px',color: 'white' }}>
        <Typography variant="h5">Proyectos</Typography>
        <Fragment>
          <ProyectList isAuthenticated={isAuthenticated} />
        </Fragment>
      </Box>
    </Box>
  );
}

export default Dashboard;
