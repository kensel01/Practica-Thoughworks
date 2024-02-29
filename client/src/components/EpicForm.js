import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


const EpicForm = ({ onClose }) => { 
    const [epics, setEpics] = useState({
        title: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useHistory();
    const { id } = useParams();

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
                proyect_id: id,
                title: epics.title,
                description: epics.description

            }),
        };

        const url = `http://localhost:5000/proyect/${id}/epics`;
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Error al crear el epica');
            }
            onClose();
            ;
        }
        catch (error) {
            console.error('Errir ak crear epica', error);
        } finally {
            setLoading(false);
        }

    };

    const handleChange = e =>
        setEpics({
            ...epics,
            [e.target.name]: e.target.value,
        });
    useEffect(() => {

    }, []);



    return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <div> </div>
            <Grid item xs={3}>
                <Card sx={{
                    position: 'relative', backgroundColor: 'transparent', padding: '1rem', borderRadius: '10px', backdropFilter: 'blur(40px)',
                    borderRight: '2px solid rgba(255, 255, 255, .2)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
                    padding: '6px 14px', color: 'white'
                }} >
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
                        {"Create Epic"}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Write your title'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}

                                name="title"
                                value={epics.title}
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
                                    margin: '.5rem 0'
                                }}
                                name="description"
                                value={epics.description}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />

                            <Button variant='contained' color='primary' type='submit' disabled={!epics.title || !epics.description}>
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

export default EpicForm;
