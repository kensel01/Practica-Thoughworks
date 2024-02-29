import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';


export default function EpicList({ isAuthenticated }) {
  const [epics, setEpics] = useState([]);
  const navigate = useHistory();

  const path = navigate.location.pathname;
  const pathtrim = path.trim('/').split('/');
  const id_proyect = pathtrim[2];

  const loadEpics = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
      const response = await fetch(`http://localhost:5000/proyect/${id_proyect}/epics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const parseRes = await response.json();

      console.log("Respuesta OK:", response.ok, "Respuesta del servidor:", parseRes);
      if (response.ok && Array.isArray(parseRes)) {
        setEpics(parseRes);
      } else {
        console.error("Error en la respuesta del servidor:", parseRes);
        setEpics([]);
      }
    } catch (error) {
      console.error('Error fetching epics:', error);
      setEpics([]);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadEpics();
    }
  }, [isAuthenticated]);

  return (
    <>
      <h1 style={{ color: 'white', fontWeight: 'bold', textAlign: 'justify', 
      borderRadius: '10px', variant: '5', padding: '1rem' }}> Epics </h1>

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {epics.map((epic) => (
        <Card
          style={{
            width: "200px",
            backgroundColor: 'rgba(166, 34, 84, 0.7)',
            cursor: "pointer",
            border: "2px solid transparent",
            padding: "10px", 
            margin: "10px",
            marginTop: "20px"
          }}
          key={epic.epica_id}
          onClick={() => navigate.push(`/proyect/${id_proyect}/epic/${epic.epica_id}`)}
        >

          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              <Typography style={{ color: 'white',fontSize: '25px' }}>{epic.title}</Typography>
              <Typography style={{ color: 'gray' }}>{epic.description}</Typography>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
    </>
  );
}
