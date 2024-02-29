import { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, CardContent, Typography, Modal, Box } from "@mui/material";
import TaskList from './TaskList';
import TaskForm from './TaskForm'; 
import { useSidebar } from '../contexts/SidebarContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EpicDashboard = ({ isAuthenticated }) => {
    const [epic, setEpic] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const { isSidebarOpen } = useSidebar();
    const navigate = useHistory();
    const {id_epic} = useParams();
    const {id_proyect} = useParams();

    useEffect(() => {
        if (isAuthenticated) {
            loadEpic();
        }
    }, [isAuthenticated, id_proyect, id_epic]);
    const loadEpic = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:5000/proyect/${id_proyect}/epics/${id_epic}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (!response.ok) {
            console.error("Failed to fetch epic data");
            return;
        }
        const data = await response.json();
        setEpic(data);
    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        navigate.push(`/proyect/${id_proyect}/epic/${id_epic}`); 
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: 'transparent',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
            <Fragment>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'fixed',
                top: 20,
                left: isSidebarOpen ? 300 : 100,
                width: 'calc(100% - 100px)',
                minHeight: 'calc(100vh - 90px)',
                padding: '6px 14px',
                transition: 'left 0.5s ease'
              }}>
                <Box sx={{ 
                  width: '30%',
                  backgroundColor: 'transparent',
                  backdropFilter: 'blur(10px)',
                  borderRight: '2px solid rgba(255, 255, 255, .2)',
                  boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
                  color: 'white',
                  
                }}>
                  <Button
                    onClick={() => navigate.goBack()}
                    sx={{
                      minWidth: '40px',
                      height: '40px',
                      position: 'absolute',
                      left: 16,
                      top: 16,
                    }}
                  >
                    <ArrowBackIcon sx={{ color: 'white' }}/>
                  </Button>
                  <h1 style={{ color: 'white', textAlign: 'center' }}> Epica {id_epic} </h1>
                  <div style={{ display: 'flex', width: '100%' }}>
                    {epic && (
                      <Card 
                        style={{ 
                          width: '100%',
                          position: 'relative',
                          backgroundColor: 'rgba(166, 34, 84, 0.7)',
                          boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
                          color: 'white',
                          padding: '6px 14px',
                        }}
                      >
                        <CardContent
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: '100%'
                          }}
                        >
                          <div>
                            <Typography variant="h6"> {epic.title} </Typography>
                            <Typography color="textSecondary"> {epic.description} </Typography>
                          </div>
                          <Button variant="contained" color="primary" onClick={handleOpenModal}
                            style={{ backgroundColor: '#A62254', color: 'white', marginTop: '10px' }}>
                            Crear Tarea
                          </Button>
                          <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="create-task-modal"
                            aria-describedby="create-task-form"
                          >
                            <Box sx={modalStyle}>
                              <TaskForm onClose={handleCloseModal}/> 
                            </Box>
                          </Modal>    
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </Box>
                <Box sx={{
                  width: '68%',
                  backgroundColor: 'transparent',
                  backdropFilter: 'blur(10px)',
                  borderLeft: '2px solid rgba(255, 255, 255, .2)',
                  boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
                  color: 'white',
                  overflowY: 'auto',
                }}>
                  <div style={{ width: '75%', overflowY: 'auto', maxHeight: 'calc(100vh - 64px)', boxSizing: 'border-box'}}>
                    <TaskList isAuthenticated={isAuthenticated} proyectId={id_proyect} epicId={id_epic} />
                  </div>
                </Box>
              </Box>
            </Fragment>
        );      
}

export default EpicDashboard;
