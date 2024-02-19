import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProyectList({ isAuthenticated }) {
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
    if (isAuthenticated) {
      loadProyects();
    }
  }, [isAuthenticated]);

  return (
    <>
      <h1 style={{ color: '#535878', fontWeight: 'bold', textAlign: 'justify', borderRadius: '10px', variant: '5', padding: '1rem' }}> Proyect List </h1>

      {proyects.map((proyects) => (
        <Card
          style={{
            marginBottom: ".3rem",
            backgroundColor: '#9DB0CE',
            cursor: 'pointer'
          }}
          key={proyects.proyect_id}
          onClick ={() => navigate.push(`/proyects/${proyects.proyect_id}`)}
        >

          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography style={{ color: 'white' }}>{proyects.name_proyect}</Typography>
              <Typography style={{ color: 'white' }}>{proyects.proyect_description}</Typography>
            </div>

          </CardContent>
        </Card>
      ))}
    </>
  );
}
