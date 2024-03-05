import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Select, MenuItem, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return 'No date provided';
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid Date';
  return date.toISOString().split('T')[0];
};

const TaskDashboard = ({ task, close, updateTaskList, onTaskUpdate }) => {
  const [taskState, setTaskState] = useState(task ? parseInt(task.task_state) : 0);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { id_proyect,id_epic } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/users',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }, 
      });
      const users = await response.json();
      console.log('Fetched users:', users); // Added to show users obtained from the API
      if (Array.isArray(users)) {
        setAllUsers(users);
      } else {
        setAllUsers([]);
        console.error('Error fetching users: response is not an array');
      }
    };
    fetchUsers();
  }, []);

  const handleStateChange = async (event) => {
    const newState = parseInt(event.target.value);
    setTaskState(newState);
  };

  const handleParticipantChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedParticipants(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const saveTaskState = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          return;
      }
      const response = await fetch(`http://localhost:5000/proyect/${id_proyect}/epics/${id_epic}/task/${task.task_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          state: taskState,
          participants: selectedParticipants,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }

      const updatedTask = await response.json();
      console.log('Tarea actualizada:', updatedTask);
      if (typeof updateTaskList === "function") {
        updateTaskList(updatedTask);
      }
      if (typeof onTaskUpdate === "function") {
        onTaskUpdate(updatedTask);
      }
      close(); 
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const addParticipants = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(`http://localhost:5000/proyect/${id_proyect}/epics/${id_epic}/task/${task.task_id}/participants`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          participants: selectedParticipants,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al añadir participantes');
      }

      const updatedTask = await response.json();
      console.log('Participantes añadidos:', updatedTask);
      if (typeof updateTaskList === "function") {
        updateTaskList(updatedTask);
      }
      if (typeof onTaskUpdate === "function") {
        onTaskUpdate(updatedTask);
      }
    } catch (error) {
      console.error('Error al añadir participantes:', error);
    }
  };

  if (!task) {
    return <div>Loading task information...</div>;
  }

  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'rgba(166, 34, 84, 0.0)', boxShadow: 24, p: 4 }}>
      <Card sx={{ minWidth: 275, backgroundColor: 'rgba(166, 34, 84, 0.9)', color: 'white' }}>
        <CardContent>
          <Typography sx={{ color: 'white', fontSize: 20 }} color="text.secondary" gutterBottom>
          Información de la tarea
          </Typography>
          <Typography variant="h6" component="div">
            {task.task_title}
          </Typography>
          <Typography sx={{ color: 'white', mb: 1.5 }} color="text.secondary">
            Estado 
            <Select
              value={taskState}
              onChange={handleStateChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ ml: 1, color: 'black', bgcolor: 'rgba(255, 253, 253, 0.8)' }}
            >
              <MenuItem value={0}>Creada</MenuItem>
              <MenuItem value={1}>En curso</MenuItem>
              <MenuItem value={2}>Finalizada</MenuItem>
            </Select>
          </Typography>
          <Typography sx={{ mb: 2, color: 'white'}} color="text.secondary">
            Participantes
            <Select
              multiple
              value={selectedParticipants}
              onChange={handleParticipantChange}
              renderValue={(selected) => selected.join(', ')}
              sx={{ ml: 1, color: 'white', bgcolor: 'rgba(255, 253, 253, 0.8)' }}
            >
              {allUsers.map((user) => (
                <MenuItem key={user.id} value={user.user_id}>
                  {user.user_name}
                </MenuItem>
              ))}
            </Select>
          </Typography>
          <Typography variant="body2">
            Descripción: {task.task_description}
            <br />
            Dia iniciado: {formatDate(task.date_start)}
            <br />
            Dia finalizado: {formatDate(task.date_end)}
          </Typography>
        </CardContent>
      </Card>
      <Button onClick={saveTaskState} style={{ backgroundColor: '#A62254', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '20px'}}>Guardar</Button>
      <Button onClick={addParticipants} style={{ backgroundColor: '#A62254', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '20px'}}>Añadir Participantes</Button>
      <Button onClick={close} style={{ marginTop: '20px', backgroundColor: '#A62254', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', }}>Cerrar</Button>
    </Box>
  );
};

export default TaskDashboard;
