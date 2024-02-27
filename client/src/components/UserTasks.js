import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener esta importación si no está ya en el archivo

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
   
   </>
  );
};

export default UserTasks;