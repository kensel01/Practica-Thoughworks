import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, CardContent, Typography } from "@mui/material";

const EpicDashboard = ({isAuthenticated}) => {
    const [epic, setEpic] = useState(null);
    const { epic_id } = useParams();

    useEffect(() => {
        if (isAuthenticated) {
            loadEpic();
        }
    }, [isAuthenticated, epic_id]);
    const loadEpic = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:5000/proyect/:proyect_id/epics/${epic_id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
        });
        if (!response.ok) {
            console.error("Failed to fetch epic data");
            return;
        }
        const data = await response.json();
        setEpic(data);
    }

    const navigate = useHistory();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1 style={{ color:'#535878' }}>Epic Details</h1>
            <Card  style={{
                width: '25%',
                position: 'relative',
                height: 'calc(100vh - 64px)', 
                backgroundColor: '#9DB0CE',
                cursor: 'pointer' }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Epic Details
                    </Typography>
                    {epic && (
                        <>
                            <Typography variant="h6">
                                {epic.title}
                            </Typography>
                            <Typography color="textSecondary">
                                {epic.description}
                            </Typography>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default EpicDashboard;
