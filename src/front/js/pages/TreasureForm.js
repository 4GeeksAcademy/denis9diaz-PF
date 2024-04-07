import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext";

const TreasureForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [city_name, setCity_name] = useState('');
    const [tips, setTips] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
        }
    }, [navigate, actions]);

    const registerTreasure = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/treasure", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, image, location, city_name, tips })
            });

            if (!resp.ok) throw new Error("There was a problem in the request");

            const data = await resp.json();
            navigate("/lista-tesoros");
            return data;
        } catch (error) {
            setError("Update error");
        }
    };

    return (
        <div className="text-center treasure-form-page">
            <form onSubmit={registerTreasure}>
                <h1 className="title-hide pb-4">Hide treasure</h1>
                <div className="hide-input-group pb-4">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="treasure-name"
                        placeholder="Enter name of treasure"
                        value={name}
                        onChange={e => setName(e.target.value)}
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
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        className="treasure-city"
                        placeholder="Enter city"
                        value={city_name}
                        onChange={e => setCity_name(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="tips">Tips</label>
                    <input
                        type="text"
                        id="tips"
                        className="treasure-pistas"
                        placeholder="Enter your tips"
                        value={tips}
                        onChange={e => setTips(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        id="image"
                        className="treasure-image"
                        placeholder="Enter your image"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </div>
                <div className="button-hide">
                    <button type="submit" className="btn btn-warning">Hide</button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default TreasureForm;
