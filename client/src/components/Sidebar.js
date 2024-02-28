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

const Sidebar = ({setAuth}) => {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
    const history = useHistory();

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
            onMouseEnter={()=> setIsSidebarOpen(true)}
            onMouseLeave={()=> setIsSidebarOpen(false)}>
                <div className="logo-menu">
                    <h2 className="logo">
                        <CgProfile style={{ fontSize: '30px', marginRight: '8px', verticalAlign: 'middle' }} />
                        <span className="username">asd</span>
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
                            <span className="link-name" style={{ '--i': 1 }}> Dashboard </span>
                        </a>
                    </li>

                    <li className="list-item ">
                        <a onClick={() => history.push('/proyect/new')}>
                            <i className="bx bx-grid-alt">
                                <AiOutlineFundProjectionScreen />
                            </i>
                            <span className="link-name" style={{ '--i': 2 }}> Nuevo Proyecto </span>
                        </a>
                    </li>

                    <li className="list-item">
                        <a href="#">
                            <i className="bx bx-grid-alt">
                                <FaCalendarAlt />
                            </i>
                            <span className="link-name" style={{ '--i': 5 }}> Configuracion </span>
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
        </Box>
    )
}

export default Sidebar;
