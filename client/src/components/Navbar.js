import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import { Link, useHistory } from 'react-router-dom'

export default function Navbar({ setAuth }) {

  const history = useHistory()

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    history.push('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "#black" }}> Proyectos ThoughWorks </Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/proyect/new')}
          >
            New Proyect
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
)
}