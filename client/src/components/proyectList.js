import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './styles/Dashboard.css'

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

      {proyects.map((proyect) => (  // Cambia proyects a proyect en el bucle de mapeo
        <Card
          style={{
            marginBottom: ".3rem",
            backgroundColor: '#9DB0CE',
            cursor: 'pointer'
          }}
          key={proyect.proyect_id}
          onClick ={() => navigate.push(`/proyects/${proyect.proyect_id}`)}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="container-item">
              <div className="item-proyects" key={proyect.proyect_id} onClick={() => navigate.push(`/proyects/${proyect.proyect_id}`)}>
                <Typography sx={{ color: 'white' }} variant="subtitle1">{proyect.name_proyect}</Typography>
                <Typography sx={{ color: 'white' }} variant="body2">{proyect.proyect_description}</Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
