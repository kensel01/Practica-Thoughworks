import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return 'No date provided';
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid Date';
  return date.toISOString().split('T')[0];
};

const TaskDashboard = ({ task, close, updateTaskList, onTaskUpdate }) => {
  const [taskState, setTaskState] = useState(task ? parseInt(task.task_state) : 0);
  const { id_proyect,id_epic } = useParams();

  const handleStateChange = async (event) => {
    const newState = parseInt(event.target.value);
    setTaskState(newState);
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
          <Typography variant="body2">
            Descripción: {task.task_description}
            <br />
            Dia iniciado: {formatDate(task.date_start)}
            <br />
            Dia finalizado: {formatDate(task.date_end)}
          </Typography>
        </CardContent>
      </Card>
      <button onClick={saveTaskState} style={{ backgroundColor: '#A62254', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '20px'}}>Guardar</button>
      <button onClick={close} style={{ marginTop: '20px', backgroundColor: '#A62254', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', }}>Cerrar</button>
    </Box>
  );
};

export default TaskDashboard;
