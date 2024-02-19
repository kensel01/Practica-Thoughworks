import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'


const EpicForm = () => {
  const [epics, setEpics] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useHistory();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    let userId;
    if (token){
      const decodedToken = jwtDecode(token);
      userId = decodedToken.user_id;
    }
    const requestOptions = {
      method: 'POST',
      headers:{
        'content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}`: '',
      },
      body: JSON.stringify({
        title: epics.title,
        description: epics.description,
        user_id: userId,
      }),
    };
     const url = 'http://localhost:5000/proyect/:proyect_id/epics';
     try{
      const response = await fetch(url, requestOptions);
      if (!response.ok){
        throw new Error('Error al crear el epica');
      }
      navigate.push('/proyects/:id_proyect');
      ;
      }
       catch (error) {
       console.error('Errir ak crear epica',error);
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
<Grid container direction="colum" alignItems="center" justifyContent="center">
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{
                    backgroundColor: '#9DB0CE',
                    padding: '1rem',
                    borderRadius: '10px'
                }}>
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
