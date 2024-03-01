import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'; 
import TaskDashboard from './TaskDashboard'; 

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

    // Function to determine card style based on task state
    const getCardStyle = (taskState) => {
      switch (taskState) {
        case 0: // Tarea creada
          return { backgroundColor: 'lightblue' };
        case 1: // Tarea en curso
          return { backgroundColor: 'yellow' };
        case 2: // Tarea finalizada
          return { backgroundColor: 'lightgreen' };
        default:
          return {}; // Default style
      }
    };

    return (
        <>
        <h1 style={{ color: 'white', fontWeight: 'bold', textAlign: 'justify', 
        borderRadius: '10px', variant: '5', padding: '1rem' }}> Tareas </h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tasks.map((task) => (
          <Card
            style={{
              ...getCardStyle(task.task_state),
              width: "200px",
              cursor: "pointer",
              border: "2px solid transparent",
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
          }}
        >
          <TaskDashboard task={selectedTask} close={handleCloseModal} />
        </Modal>
      </>
    );
}