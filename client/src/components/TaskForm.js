import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom/cjs/react-router-dom';



const TaskForm = ({ onClose }) => {
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
            navigate.push(`/proyects/${id_proyect}`);
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
            <div> </div>
            <Grid item xs={12} md={8}>
                <Card sx={{
                    position: 'relative', backgroundColor: 'transparent', padding: '1rem', borderRadius: '10px', backdropFilter: 'blur(40px)',
                    borderRight: '2px solid rgba(255, 255, 255, .2)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
                    boxSizing: 'border-box',
                    padding: '20px',
                    color: 'white',
                    width: '100%',
                    height: '100%'
                }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', height: '100%' }} >
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant='5' textAlign='center' color='white'>
                        {"Create Task"}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant='filled'
                                        label='Write your title'
                                        sx={{
                                            display: 'block',
                                            margin: '.5rem 0',
                                            width: '100%'
                                        }}

                                        name="title"
                                        value={task.title}
                                        onChange={handleChange}
                                        inputProps={{ style: { color: 'white' } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />

                                    <TextField
                                        variant='filled'
                                        label='Write your description'
                                        multiline
                                        rows={4}
                                        sx={{
                                            display: 'block',
                                            margin: '.5rem 0',
                                            width: '100%'
                                        }}
                                        name="description"
                                        value={task.description}
                                        onChange={handleChange}
                                        inputProps={{ style: { color: 'white' } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant='filled'
                                        label='Write your state'
                                        sx={{
                                            display: 'block',
                                            margin: '.5rem 0',
                                            width: '100%'
                                        }}
                                        name="state"
                                        value={task.state}
                                        onChange={handleChange}
                                        inputProps={{ style: { color: 'white' } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />

                                    <TextField
                                        variant='filled'
                                        label='Write your date start'
                                        type="date"
                                        sx={{
                                            display: 'block',
                                            margin: '.5rem 0',
                                            width: '100%'
                                        }}
                                        name="date_start"
                                        value={task.date_start}
                                        onChange={handleChange}
                                        inputProps={{ style: { color: 'white' } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />

                                    <TextField
                                        variant='filled'
                                        label='Write your date end'
                                        type="date"
                                        sx={{
                                            display: 'block',
                                            margin: '.5rem 0',
                                            width: '100%'
                                        }}
                                        name="date_end"
                                        value={task.date_end}
                                        onChange={handleChange}
                                        inputProps={{ style: { color: 'white' } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                            </Grid>

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
