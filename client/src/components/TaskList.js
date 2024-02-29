import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function TaskList({ isAuthenticated }) {
    const [tasks, setTasks] = useState([]);
    const navigate = useHistory();
    const {id_proyect}= useParams();
    const {id_epic}= useParams();

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

    return (
        <>
        <h1 style={{ color: 'white', fontWeight: 'bold', textAlign: 'justify', 
        borderRadius: '10px', variant: '5', padding: '1rem' }}> Tareas </h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tasks.map((task) => (
          <Card
            style={{
              width: "200px",
              backgroundColor: 'rgba(166, 34, 84, 0.7)',
              cursor: "pointer",
              border: "2px solid transparent",
              padding: "10px", 
              margin: "10px",
              marginTop: "20px"
            }}
            key={task.task_id}
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
      </>
    );
}