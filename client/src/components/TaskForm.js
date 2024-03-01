import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, IconButton } from '@mui/material'


const TaskForm = ({ onClose, onTaskCreated }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        state: '0',
        date_start: '',
        date_end: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useHistory();

    const { id_proyect } = useParams();
    const { id_epic } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                state: task.state,
                dateStart: task.date_start,
                dateEnd: task.date_end,
                epica_id: id_epic
            }),
        };

        const url = `http://localhost:5000/proyect/${id_proyect}/epics/${id_epic}/task`;
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Error al crear tarea');
            }
            const newTask = await response.json();
            onTaskCreated(newTask);
            navigate.push(`/proyect/${id_proyect}/epic/${id_epic}`);
        }
        catch (error) {
            console.error('Error al crear tarea', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = e =>
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    useEffect(() => {

    }, []);

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={3}>

                <Card sx={{ position: 'relative', backgroundColor: '#A62254', padding: '2rem'}}>

                    <IconButton aria-label="close" onClick={onClose}
                        style={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant='h7' align='left' style={{ fontSize: '20px', color: 'white' }}>
                        Crear Tarea
                    </Typography>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField variant='filled' label='Write your title' multiline rows={2}
                                sx={{ display: 'block', margin: '.5rem 0', width: '100%' }}
                                    name="title"
                                    value={task.title}
                                    onChange={handleChange}
                                    inputProps={{ style: { color: 'white' } }}
                                    InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField variant='filled' label='Write your description' multiline rows={4}
                                sx={{ display: 'block', margin: '.5rem 0', width: '100%' }}
                                    name="description"
                                    value={task.description}
                                    onChange={handleChange}
                                    inputProps={{ style: { color: 'white' } }}
                                    InputLabelProps={{ style: { color: 'white' } }}
                            />
                            
                            <TextField variant='filled' label='Dia iniciado' type="date" 
                                sx={{ display: 'block', margin: '.5rem 0', width: '100%'}}
                                    name="date_start"
                                    value={task.date_start}
                                    onChange={handleChange}
                                    inputProps={{ style: { color: 'white' } }}
                                    InputLabelProps={{ style: { color: 'white' , marginBottom: '0.5rem'} }}
                            />
                            <TextField variant='filled' label='Dia finalizado' type="date" 
                                sx={{ display: 'block', margin: '.5rem 0', width: '100%'}}
                                    name="date_end"
                                    value={task.date_end}
                                    onChange={handleChange}
                                    inputProps={{ style: { color: 'white' } }}
                                    InputLabelProps={{ style: { color: 'white', marginBottom: '0.5rem' } }}
                            />

                            <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description || !task.state || !task.date_start || !task.date_end}>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit" size={24} />
                                ) : (
                                    "Save"
                                )}
                            </Button>

                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default TaskForm;
