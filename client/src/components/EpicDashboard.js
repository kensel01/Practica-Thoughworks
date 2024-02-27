import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, CardContent, Typography, Modal, Box } from "@mui/material";
import TaskList from './TaskList';
import TaskForm from './TaskForm'; // Import TaskForm component

const EpicDashboard = ({ isAuthenticated }) => {
    const [epic, setEpic] = useState(null);
    const [openModal, setOpenModal] = useState(false);
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
    const handleCloseModal = () => setOpenModal(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <h1 style={{ color: '#535878' }}>Epic Details</h1>
            <Card style={{
                width: '25%',
                position: 'relative',
                height: 'calc(100vh - 64px)',
                backgroundColor: '#9DB0CE',
                cursor: 'pointer'
            }}
            >
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", height: '100%' }}>
                    <Typography variant="h5" component="h2">
                        Epic Details
                    </Typography>
                    {epic && (
                        <>
                            <Typography variant="h6">
                                {epic.title}
                            </Typography>
                            <Typography color="textSecondary">
                                {epic.description}
                            </Typography>
                        </>
                    )}
                    
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        Create Task
                    </Button>
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="create-task-modal"
                        aria-describedby="create-task-form"
                    >
                        <Box sx={modalStyle}>
                            <TaskForm /> 
                        </Box>
                    </Modal>
                    
                </CardContent>
            </Card>
            <div style={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflowY: 'auto' }}>
                <TaskList isAuthenticated={isAuthenticated} proyectId={id_proyect} epicId={id_epic} />
            </div>
        </div>
    )
}

export default EpicDashboard;
