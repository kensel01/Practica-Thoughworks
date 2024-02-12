import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
  const [proyect, setProyect] = useState([]);
  const navigate = useHistory()

  const loadProyect = async () => {
    const response = await fetch("http://localhost:5000/proyect", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      setProyect(data);
    } else {
      console.error('La respuesta no es un arreglo', data);
      setProyect([]); // Establece proyect a un arreglo vacío si data no es un arreglo
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/proyect/${id}`, {
        method: "DELETE",
      });

      setProyect(proyect.filter((proyect) => proyect.id !== id));
    } catch (error) {
      console.log(error);
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
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(proyect.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
