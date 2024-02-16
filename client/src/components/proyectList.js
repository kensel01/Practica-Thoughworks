import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

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
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      const response = await fetch(`http://localhost:5000/proyects/user/${userId}`, {
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
      <h1> Proyect List </h1>
      {proyects.map((proyects) => (
        <Card
          style={{
            marginBottom: ".3rem",
            backgroundColor: "silver",
          }}
          key={proyects.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>{proyects.name}</Typography>
              <Typography>{proyects.description}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/proyect/${proyects.id}/edit`)}
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
