import React, {  useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';



const EpicForm = () => {
  const [epics, setEpics] = useState({
    title: '',
    description: '',
    state:'',
    date_start:'',
    date_end:'',

  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();


  const path = navigate.location.pathname;
  const pathtrim= path.trim('/').split('/');
  const id_proyect = pathtrim[2];


  const handleSubmit = async (e)=> {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
   
    const requestOptions = {
      method: 'POST',
      headers:{
        'content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}`: '',
      },
      body: JSON.stringify({
       proyect_id: id_proyect,
        title: epics.title,
        description: epics.description

      }),
    };

     const url = `http://localhost:5000/proyect/${id_proyect}/epics/${epica_id}/task`;
     try{
      const response = await fetch(url, requestOptions);
      if (!response.ok){
        throw new Error('Error al crear tarea');
      }
      navigate.push(`/proyects/${id_proyect}`);
      ;
      }
       catch (error) {
       console.error('Errir ak crear tarea',error);
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
                <Card sx={{ mt: 5, position: 'relative' }} style={{
                    backgroundColor: '#9DB0CE',
                    padding: '1rem',
                    borderRadius: '10px'
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={() => navigate.push(`/proyects/${id_proyect}`)}
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
                            <TextField
                                variant='filled'
                                label='Write your title'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
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
                                    margin: '.5rem 0'
                                }}
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />

                            <TextField
                                variant='filled'
                                label='Write your state'
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
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
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="date"
                                value={date.start}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />

                            <TextField
                                variant='filled'
                                label='Write your date end'
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="date"
                                value={date.end}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />

                            <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description || !task.state || date.start ||
                                        date.end}>
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
