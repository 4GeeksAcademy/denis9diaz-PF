import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext"

const TreasureList = () => {
    const { store, actions } = useContext(Context)
    const [treasures, setTreasures] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (token) { 
            const loadTreasures = async () => {
                try {
                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/treasures", {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch treasures');
                    }

                    const fetchedTreasures = await response.json();
                    setTreasures(fetchedTreasures); 
                } catch (error) {
                    console.error("Failed to load treasures", error);
                }
            };

            loadTreasures();
        }
    }, []); 

    return (
        <div className="text-center treasure-list-page">
            <h1>Lista de tesoros ocultos</h1>
            <ul className="treasure-list">
                {treasures.map((treasure) => (
                    <li className="element-treasure-list" key={treasure.id}>{treasure.name} - {treasure.city}</li>
                ))}
            </ul>
        </div>
    );
};

export default TreasureList;
