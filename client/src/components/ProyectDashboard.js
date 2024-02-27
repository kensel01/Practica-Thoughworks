import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Modal, Box } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import EpicList from "./EpicList";
import EpicForm from "./EpicForm";

const ProyectDashboard= ({ isAuthenticated })=> { 
    const { id } = useParams();
    const [proyect, setProyect] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
      if (isAuthenticated) {
        loadproyect();
      }
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

const handleOpenModal = () => setOpenModal(true);
const handleCloseModal = () => {
    setOpenModal(false);
    if (id) {
        navigate.push(`/proyects/${id}`); 
    } else {
        console.error("Project ID is undefined");
    }
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

    return (
      <Fragment>
        <h1 style={{color: '#535878'}}>Proyecto{id}</h1>
        <div style={{ display: 'flex', width: '100%' }}>
          {proyect && (
            <Card
              style={{
                width: '25%',
                position: 'relative',
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
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        Create Epic
                    </Button>
              <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="create-task-modal"
                        aria-describedby="create-task-form"
                    >
                        <Box sx={modalStyle}>
                            <EpicForm /> 
                        </Box>
                    </Modal>
              </CardContent>
            </Card>
          )}
          <div style={{ width: '75%', overflowY: 'auto' }}>
            <EpicList proyectId={id} isAuthenticated={isAuthenticated} /> 
          </div>
        </div>
      </Fragment>
    )
  }
  
  export default ProyectDashboard;
