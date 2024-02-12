import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom'

export default function ProyectList() {
  const [proyect, setProyect] = useState([]);
  const navigate = useHistory()

  const loadProyect = async () => {
    const token = localStorage.getItem('token'); 
    const response = await fetch("http://localhost:5000/proyects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      setProyect(data);
    } else {
      console.error('La respuesta no es un arreglo', data);
      setProyect([]); 
    }
  };


  useEffect(() => {
    loadProyect();
  }, []);
  return (
    <>
      <h1> Proyect List </h1>
      {proyect.map((proyect) => (
        <Card
          style={{
            marginBottom: ".3rem",
            backgroundColor: "silver",
          }}
          key={proyect.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>{proyect.title}</Typography>
              <Typography>{proyect.description}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/proyect/${proyect.id}/edit`)}
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
