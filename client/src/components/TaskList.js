import TaskDashboard from './TaskDashboard';
import { useEffect, useState } from "react";
import { Box, Card, Modal, Typography, CardContent } from '@mui/material';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function TaskList({ isAuthenticated }) {
    const [tasks, setTasks] = useState([]);
    const navigate = useHistory();
    const {id_proyect}= useParams();
    const {id_epic}= useParams();
    const [openModal, setOpenModal] = useState(false); 
    const [selectedTask, setSelectedTask] = useState(null); 

    const loadTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const response = await fetch(`http://localhost:5000/proyect/${id_proyect}/epics/${id_epic}/task`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const parseRes = await response.json();

            console.log("Respuesta OK:", response.ok, "Respuesta del servidor:", parseRes);
            if (response.ok && Array.isArray(parseRes)) {
                setTasks(parseRes);
            } else {
                console.error("Error en la respuesta del servidor:", parseRes);
                setTasks([]);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            loadTasks();
        }
    }, [isAuthenticated]);

    const handleOpenModal = (task) => {
        setSelectedTask(task);
        setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    const getCardStyle = (taskState) => {
      switch (taskState) {
        case 0: // Tarea creada
          return { backgroundColor: 'rgba(20, 215, 222, 0.8)' };
        case 1: // Tarea en curso
          return { backgroundColor: 'rgba(238, 225, 28, 0.9)' };
        case 2: // Tarea finalizada
          return { backgroundColor: 'rgba(40, 229, 21, 0.8)'  };
        default:
          return {}; // Default style
      }
    };

    const updateTaskList = (updatedTask) => {
        const updatedTasks = tasks.map(task => {
            if(task.task_id === updatedTask.task_id) {
                return updatedTask;
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <>
      <h1 style={{ color: 'white', fontWeight: 'bold', textAlign: 'justify', borderRadius: '10px', variant: '5', padding: '1rem' }}> Tareas </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {tasks.map((task) => (
          <Card
            style={{...getCardStyle(task.task_state),
              width: "200px",
              padding: "10px", 
              margin: "10px",
              marginTop: "20px"
            }}
            key={task.task_id}
            onClick={() => handleOpenModal(task)} // Changed to open modal
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <Typography style={{ color: 'white',fontSize: '25px'  }}>{task.task_title}</Typography>
                <Typography style={{ color: 'gray' }}>{task.task_description}</Typography>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="task-dashboard-modal"
          aria-describedby="task-dashboard-modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
          <TaskDashboard task={selectedTask} close={handleCloseModal} updateTaskList={updateTaskList} />
        </Box>
        </Modal>
      </>
    );
}