import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext"

const TreasureForm = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [pistas, setPistas] = useState("");
    const [city, setCitys] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
        }
    }, [navigate]);

    const registerTreasure = async (e) => {
        e.preventDefault();
        setError("");

        const resp = await fetch(process.env.BACKEND_URL + "/api/treasure", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, location, image, pistas, city })
        });

        if (!resp.ok) throw Error("There was a problem in the resgister request");

        const data = await resp.json();
        navigate("/lista-tesoros");
        return data;
    };

    return (
        <div className="text-center treasure-form-page">
            <form onSubmit={registerTreasure}>
                <h1 className="title-hide pb-4">Hide your treasure</h1>
                <div className="hide-input-group pb-4">
                    <label htmlFor="name-treasure">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="treasure-name"
                        placeholder="Enter name of treasure"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        className="treasure-location"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="pistas">City</label>
                    <div className="treasure-city">
                        <input
                            type="text"
                            id="city"
                            className="treasure-image"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCitys(e.target.value)}
                        />
                    </div>
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="pistas">Pistas</label>
                    <div className="treasure-pistas">
                        <input
                            type="text"
                            id="pistas"
                            className="treasure-image"
                            placeholder="Enter your pistas"
                            value={pistas}
                            onChange={(e) => setPistas(e.target.value)}
                        />
                    </div>
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="image">Image</label>
                    <div className="password-input-container">
                        <input
                            type="text"
                            id="image"
                            className="treasure-image"
                            placeholder="Enter your image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                </div>
                {error && <div className="error-message mb-4">{error}</div>}
                <div className="button-hide">
                    <button type="submit" className="btn btn-warning">Register</button>
                </div>
            </form>
        </div>
    )
}

export default TreasureForm
