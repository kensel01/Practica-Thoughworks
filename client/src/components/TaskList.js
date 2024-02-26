import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TaskList({ isAuthenticated }) {
    const [tasks, setTasks] = useState([]);
    const navigate = useHistory();

    const loadTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const response = await fetch(`http://localhost:5000/tasks`, {
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
        <h1>Lista de tareas</h1>
    );
}