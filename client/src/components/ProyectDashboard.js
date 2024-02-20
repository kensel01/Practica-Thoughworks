import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useParams,useHistory } from "react-router-dom";



const ProyectDashboard= ()=> {
    const { id } = useParams();
    const [proyect, setProyect] = useState(null);

    useEffect(() => {
        loadproyect();
    }, [id]);

const loadproyect= async()=>{
    const token = localStorage.getItem("token"); 
    const response = await fetch(`http://localhost:5000/proyects/${id}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
    })
    if (!response.ok) {
        console.error("Failed to fetch project data");
        return;
    }
    const data = await response.json()
    setProyect(data); 

}
const navigate = useHistory();

    return (
      <Fragment>
        <h1 style={{color: '#535878'}}>Proyecto{id}</h1>
        {proyect && (
          <Card
            style={{
              width: '25%',
              position: 'absolute',
              left: 0,
              top: '64px', 
              height: 'calc(100vh - 64px)', 
              backgroundColor: '#9DB0CE',
              cursor: 'pointer'
            }}
            key={proyect.proyect_id}
          >

            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: '100%'
              }}
            >
              <div>
                <Typography style={{ color: 'white' }}>{proyect.name_proyect}</Typography>
                <Typography style={{ color: 'white' }}>{proyect.proyect_description}</Typography>
              </div>
            <Button
              variant="contained"
              color="primary"
              style={{
                alignSelf: 'flex-end',
                marginTop: 'auto'
              }}
              onClick={() => navigate.push(`/proyect/${id}/epic/new`)}
            >
              Crear Epica
            </Button>
            </CardContent>
          </Card>
        )}
      </Fragment>
    )
  }
  
  export default ProyectDashboard;