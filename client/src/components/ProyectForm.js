import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function ProyectForm() {
    const [proyects, setProyects] = useState({
        name: '',
        description: '',
        colaboradores: '',
    });

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const navigate = useHistory();
    const params = useParams();

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
            method: editing ? 'PUT' : 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '', 
            },
            body: JSON.stringify({
                name: proyects.name,
                description: proyects.description,
                createby: userId, 
                colaboradores: proyects.colaboradores.split(',').map(id => id.trim()), 
                
            }),
            
        };
        

        const url = editing ? `http://localhost:5000/proyects/${params.id}` : 'http://localhost:5000/proyects';

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Error al crear/editar el proyecto');
            }
            
            navigate.push('/dashboard'); 
        } catch (error) {
            console.error('Error al crear/editar el proyecto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = e =>
        setProyects({ ...proyects, [e.target.name]: e.target.value });

    const loadProyects = async (id) => {
        const res = await fetch(`http://localhost:5000/proyects/${params.id}`);
        const data = await res.json()
        setProyects({ name: data.name, description: data.description, create_by: data.create_by })
        setEditing(true)
    }

    useEffect(() => {
        if (params.id) {
            loadProyects(params.id);
        }
    }, [params.id]);

    return (
        <Grid container direction="colum" alignItems="center" justifyContent="center">
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{
                    backgroundColor: '#9DB0CE',
                    padding: '1rem'
                }}>
                    <Typography variant='5' textAlign='center' color='#535878'>
                        {editing ? "Edit Proyects" : "Create Proyects"}
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

                                name="name"
                                value={proyects.name}
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
                                value={proyects.description}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                variant='filled'
                                label='Colaboradores (IDs separados por comas)'
                                multiline
                                rows={2}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="colaboradores"
                                value={proyects.colaboradores}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <Button variant='contained' color='primary' type='submit' disabled={!proyects.name || !proyects.description}>
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