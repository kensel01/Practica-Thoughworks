import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useHistory } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';

export default function EpicList ({isAuthenticated}){
    const [epics, setEpics] = useState([]);
    const navigate = useHistory(); 

    const loadEpics = async ()=>{
        try{
            const token = localStorage.getItem('token');
            if(!token){
                console.log('No token found');
                return;
            }
            const decodedToken = jwtDecode(token);
           const userId= decodedToken.user_id;
           const response = await fetch(`http://localhost:5000/api/epic`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
           });
           const parseRes= await response.json();
           
           console.log("Respuesta OK:", response.ok, "Respuesta del servidor:", parseRes);
           if (response.ok && Array.isArray(parseRes)){
               setEpics(parseRes);
           }else{
            console.error("Error en la respuesta del servidor:", parseRes);
            setEpics([]);
           }
        } catch (error) {
            console.error('Error fetching epics:', error);
            setEpics([]);
        }
    }

    useEffect(()=>{
        if(isAuthenticated){
            loadEpics();
        }
    }, [isAuthenticated]);

    return(
        <h1>Epics</h1>
    );

}

