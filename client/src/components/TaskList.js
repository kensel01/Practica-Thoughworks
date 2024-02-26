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
        <div>
            {tasks.map((task) => (
                <Card key={task.id} variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Task ID: {task.id}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {task.title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {task.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}