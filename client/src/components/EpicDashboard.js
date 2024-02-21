import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const EpicDashboard = ({isAuthenticated}) => {
    const [epics, setEpics] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            loadEpics();
        }
    }, [isAuthenticated]);
    const loadEpics = async () => {
        const token = localStorage.getItem()
        const response = await fetch(`/epics/${proyectId}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
        });
        if (!response.ok) {
            console.error("Failed to fetch project data");
            return;
        }
        const data = await response.json();
        setEpics(data);
    }

    const navigate = useHistory();
    return (
        <div>
            <h1>Epic Dashboard</h1>
        </div>
    )
}

