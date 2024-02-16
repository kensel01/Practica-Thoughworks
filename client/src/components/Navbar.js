import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import { Link, useHistory } from 'react-router-dom'

export default function Navbar() {

  const history = useHistory()

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position= 'static' color= 'transparent' >
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/dashboard" style={{ textDecoration:"none", color:"#black" }}> Proyectos ThoughWorks </Link>
            </Typography>

            <Button 
            variant="contained" 
            color="primary" 
            onClick={ () => history.push('/proyects/new')} 
            >
              New Proyect
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}