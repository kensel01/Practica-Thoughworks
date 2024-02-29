import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Modal, Box } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import EpicList from "./EpicList";
import EpicForm from "./EpicForm";

const ProyectDashboard = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [proyect, setProyect] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadproyect();
    }
  }, [id]);

  const loadproyect = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/proyects/${id}`, {
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
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'transparent',
    backdropFilter: 'blur(40px)',
    borderRight: '2px solid rgba(255, 255, 255, .2)',
    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Fragment>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 20,
        left: 100,
        width: 'calc(100% - 100px)',
        minHeight: 'calc(100vh - 90px)',
        padding: '6px 14px',
      }}>
        <Box sx={{
          width: '30%',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(40px)',
          borderRight: '2px solid rgba(255, 255, 255, .2)',
          boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
          color: 'white',
        }}>
          <h1 style={{ color: '#535878' }}>Proyecto{id}</h1>
          <div style={{ display: 'flex', width: '100%' }}>
            {proyect && (
              <Card
                style={{
                  width: '60%',
                  position: 'relative',
                  minHeight: 'calc(80vh - 64px)',
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
                    <Typography style={{ color: 'black' }}>---------------</Typography>
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
                      <EpicForm onClose={handleCloseModal} />
                    </Box>
                  </Modal>
                </CardContent>
              </Card>
            )}
          </div>
        </Box>
        <Box sx={{
          width: '68%',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(40px)',
          borderLeft: '2px solid rgba(255, 255, 255, .2)',
          boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
          color: 'white',
          overflowY: 'auto',
        }}>
          <div style={{ width: '75%', overflowY: 'auto', maxHeight: 'calc(100vh - 64px)', boxSizing: 'border-box' }}>
            <EpicList proyectId={id} isAuthenticated={isAuthenticated} />
          </div>
        </Box>
      </Box>
    </Fragment >
  )
}

export default ProyectDashboard;
