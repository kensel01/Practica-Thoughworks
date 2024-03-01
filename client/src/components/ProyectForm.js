import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, IconButton } from '@mui/material'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';

export default function ProyectForm() {
    const [proyects, setProyects] = useState({
        name: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useHistory();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token'); 
        let userId;
        if (token) {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.user_id; 
        }
        const requestOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '', 
            },
            body: JSON.stringify({
                name: proyects.name,
                description: proyects.description,
                createby: userId, 
            }),
            
        };
        

        const url = 'http://localhost:5000/proyects';

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Error al crear el proyecto');
            }
            
            navigate.push('/dashboard'); 
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = e =>
        setProyects({ ...proyects, [e.target.name]: e.target.value });

    useEffect(() => {
    }, []);

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={10} sm={6} md={4}>
          <Card sx={{ position: 'fixed', backgroundColor: 'transparent', padding: '1rem', borderRadius: '10px',backdropFilter: 'blur(40px)',
        borderRight: '2px solid rgba(255, 255, 255, .2)',
        boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
        top: '50%',
        left: '50%',
        transform:'translate(-50%,-50%)',
        overflowY:'hidden',
        padding: '6px 14px',color: 'white' }}>
            <IconButton
              aria-label="close"
              onClick={() => navigate.push('/dashboard')}
              style={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h5' textAlign='center' color='white' gutterBottom>
              {"Create Proyects"}
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant='filled'
                  label='Escribe tu título'
                  fullWidth
                  margin='normal'
                  name="name"
                  value={proyects.name}
                  onChange={handleChange}
                  inputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
                <TextField
                  variant='filled'
                  label='Escribe tu descripción'
                  multiline
                  rows={4}
                  fullWidth
                  margin='normal'
                  name="description"
                  value={proyects.description}
                  onChange={handleChange}
                  inputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={!proyects.name || !proyects.description}
                  sx={{ marginTop: '1rem' }}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={24} />
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