import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link, useHistory, useLocation } from 'react-router-dom'

export default function Navbar({ setAuth }) {

  const history = useHistory()
 

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
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
)
}