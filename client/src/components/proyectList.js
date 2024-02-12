import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';

export default function ProyectList() {
  const [proyects, setProyects] = useState([]);
  const navigate = useHistory();

  const loadProyects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch("http://localhost:5000/proyects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const parseRes = await response.json();

      console.log("Respuesta OK:", response.ok, "Respuesta del servidor:", parseRes);
      if (response.ok && Array.isArray(parseRes)) {
        setProyects(parseRes);
      } else {
        console.error('La respuesta no es un arreglo', parseRes);
        setProyects([]);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setProyects([]);
    }
  };

  useEffect(() => {
    loadProyects();
  }, []);

  return (
    <>
      <h1> Project List </h1>
      {proyects.map((proyect) => (
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
              <Typography>{proyect.name}</Typography>
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
