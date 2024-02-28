import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { Card, CardContent, Typography } from '@mui/material';

const UserTasks = ({ isAuthenticated }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found");
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
        const response = await fetch(`http://localhost:5000/user/${userId}/tasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  return (
   <>
   <h1 style={{color: '#535878', fontWeight: 'bold', textAlign: 'justify', borderRadius: '10px', variant:'5', padding:'1rem'}}>My Tasks</h1>
   {tasks.map((task) => (
     <Card
     style={{
       marginBottom: ".3rem",
       backgroundColor: '#9DB0CE',
       cursor: 'pointer'
     }}
        key={task.id}
   >
     <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="container-item">
              <div className="item-proyects" key={task.id}>
                <Typography sx={{ color: 'white' }} variant="subtitle1">{task.title}</Typography>
                <Typography sx={{ color: 'white' }} variant="body2">{task.description}</Typography>
              </div>
            </div>
          </CardContent>
   
     
   </Card>
   ))}
  </>
  );
};

export default UserTasks;