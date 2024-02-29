import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';


const TaskDashboard = ({ isAuthenticated, match }) => {
  const { id_proyect, id_epic, id_task } = useParams();
  const [task, setTask] = useState({})
  useEffect(() => {
    if (isAuthenticated) {
      loadtask()
    }
  }, [isAuthenticated]);

  const loadtask = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/proyect/${id_proyect}/epics/${id_epic}/task/${id_task}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}}`
      },
    });
    if (!response.ok) {
      console.error("Failed to fetch task data");
      return;
    }
    const data = await response.json()
    setTask(data);

  }
  return (
    <h1> TaskDashboard</h1>
  )

}

export default TaskDashboard;