import React, { useState, useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import './styles/Dashboard.css'
import { useSidebar } from '../contexts/SidebarContext';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const Sidebar = ({ setAuth, isAuthenticated, userId}) => {
    const [userInfo, setUserInfo] = useState({});
    const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
    const history = useHistory();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const decoded = jwtDecode(token);
                const userId = decoded.user_id;
                const response = await fetch(`http://localhost:5000/users/${userId}`, {
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

        fetchUserInfo(); 

    }, []); 
    useEffect(() => {
        console.log("Valor de isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    const toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuth(false);
        history.push('/login');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <nav className={`sidebar ${isSidebarOpen ? 'active' : ''}`}
                onMouseEnter={() => setIsSidebarOpen(true)}
                onMouseLeave={() => setIsSidebarOpen(false)}>
                <div className="logo-menu">
                    <h2 className="logo">
                        <CgProfile style={{ fontSize: '30px', marginRight: '8px', verticalAlign: 'middle' }} />
                        <span className="username"> {userInfo.user_name} </span>
                    </h2>
                    <i className="bx bx-menu toggle-btn" onClick={toggleSidebar}>
                        <IoMdMenu />
                    </i>
                </div>
                <ul className="list">
                    <li className="list-item active ">
                        <a onClick={() => history.push("/dashboard")}>
                            <i className='bx bx-grid-alt'>
                                <MdOutlineDashboard />
                            </i>
                            <span className="link-name" style={{ '--i': 1 }}> Proyectos </span>
                        </a>
                    </li>

                    <li className="list-item ">
                        <a onClick={() => history.push('/proyect/new')}>
                            <i className="bx bx-grid-alt">
                                <AiOutlineFundProjectionScreen />
                            </i>
                            <span className="link-name" style={{ '--i': 2 }}> Crear Proyecto </span>
                        </a>
                    </li>

                    <li className="list-item">
                        <Link to="/update-user/:user_id">
                            <i className="bx bx-grid-alt">
                                <FaCalendarAlt />
                            </i>
                            <span className="link-name" style={{ '--i': 3 }}> Configuracion </span>
                        </Link>
                    </li>

                    <li className="list-item">
                        <a href="#" onClick={handleLogout}>
                            <i className="bx bx-grid-alt">
                                <CiLogout />
                            </i>
                            <span className="link-name" style={{ '--i': 4 }}> Cerrar Sesión </span>
                        </a>
                    </li>

                </ul>
            </nav>
        </Box>
    )
}

export default Sidebar;
