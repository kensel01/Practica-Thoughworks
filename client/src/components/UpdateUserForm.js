import { Button, Card, CardContent, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const UserUpdateForm = () => {
  const { user_id } = useParams(); 
  const [user, setUser] = useState({
    email: '',
    user_password: '',
    user_name: ''
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log('user_id:', user_id); 
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
        console.log('Datos del usuario obtenidos:', user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Valor de user_id:', user_id);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    try {
      const response = await fetch(`http://localhost:5000/users/${user_id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Error updating user');
      }
      history.push('/dashboard');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={10} sm={6} md={4}>
          <Card sx={{
            position: 'fixed',
            backgroundColor: 'transparent',
            padding: '1rem',
            borderRadius: '10px',
            backdropFilter: 'blur(40px)',
            borderRight: '2px solid rgba(255, 255, 255, .2)',
            boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            overflowY: 'hidden',
            padding: '6px 14px',
            color: 'white'
          }}>
            <IconButton
              aria-label="close"
              onClick={() => history.push('/dashboard')}
              style={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h5' textAlign='center' color='white' gutterBottom>
              Update User
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label='Email'
                  name='email'
                  value={user.email}
                  onChange={handleChange}
                  margin='normal'
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
                <TextField
                  fullWidth
                  label='Password'
                  type='password'
                  name='user_password'
                  value={user.user_password}
                  onChange={handleChange}
                  margin='normal'
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
                <TextField
                  fullWidth
                  label='User Name'
                  name='user_name'
                  value={user.user_name}
                  onChange={handleChange}
                  margin='normal'
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!user.email || !user.user_password || !user.user_name || loading}
                  sx={{ marginTop: '1rem' }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
  
};

export default UserUpdateForm;

