import React from "react";
import { Link } from "react-router-dom";
import mapsImage from "/src/front/img/mapsImage.png";
import "../../styles/home.css";
import backgroundImage from '/src/front/img/backgroundImage.png';
import esconde from '/src/front/img/esconde.webp';
import encuentra from '/src/front/img/encuentra.webp';
import rankings from '/src/front/img/rankings.webp';
import join from '/src/front/img/join.webp';

export const Home = () => {
    return (
        <div className="home-container">
            {/* Sección Hero */}
            <div className="hero-section text-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0' }}>
                <div className="description">
                    <h1 className="description-title mt-5">Welcome to Urban Treasures</h1>
                    <p className="description-text">Join the adventure and discover hidden treasures around you or hide your own for others to find.</p>
                </div>
                <div className="action-buttons">
                    <Link to="/formulario-tesoro">
                        <button className="btn btn-custom btn-hide-treasure mt-3">Hide your treasure</button>
                    </Link>
                    <Link to="/lista-tesoros">
                        <button className="btn btn-custom btn-find-treasures mt-3 ms-3">Find treasures</button>
                    </Link>
                </div>
                <div className="image-maps mt-5 mb-5">
                    <img src={mapsImage} alt="Map showing treasure locations" className="map-image" />
                </div>
            </div>

            {/* Sección Cómo Funciona */}
            <div className="container-fluid px-0">
                <div className="row mx-0">
                    <div className="col-3 left-column px-0">
                        <h2 className="how-it-works pt-5 ps-5">How It Works</h2>
                        <p className="how-text ps-5">Discover how you can participate in this exciting treasure hunt.</p>
                    </div>
                    <div className="col-9 right-column px-0">
                        <div className="image-description pt-5">
                            <img src={esconde} className="imagen-how" alt="Descripción de la imagen 1" />
                            <p className="text-how pt-4">1. Hide your treasure so that other users can find it. Earn points for it!</p>
                        </div>
                        <div className="image-description pt-5">
                            <img src={encuentra} className="imagen-how" alt="Descripción de la imagen 2" />
                            <p className="text-how pt-4">2. Find the treasures hidden around your city and earn points for it!</p>
                        </div>
                        <div className="image-description pt-5 pe-5">
                            <img src={rankings} className="imagen-how" alt="Descripción de la imagen 3" />
                            <p className="text-how pt-4">3. Climb up the rankings! Each treasure you hide or find will award you 10 points. Earn your first 100 points to advance to the next Status!</p>
                        </div>
                    </div>
                </div>
                <div className="row mx-0 text-center">
                    <div className="col">
                        <p className="text-links">Do you want to know how the Scoring and Status work?<Link to="/status" className="score-status ms-1">Score & Status</Link> | Tap to view the rankings<Link to="/rankings" className="link-rankings ms-1">Go to Rankings</Link></p>
                    </div>
                </div>
            </div>

            {/* Sección de Invitación a Registrarse/Iniciar Sesión */}
            <div className="container-fluid-join pb-5 px-0">
                <div className="row mx-0">
                    <div className="col-3 left-column px-0">
                        <h2 className="how-it-works pt-5 ps-5">Join the Adventure</h2>
                        <p className="how-text ps-5">Sign up today and start your own treasure hunting journey.</p>
                    </div>
                    <div className="col-9 right-column px-0">
                        <div className="image-description pt-5 pe-5">
                            <img src={join} className="imagen-how ms-5" alt="Join the Adventure" />
                        </div>
                        <div className="d-flex align-items-center justify-content-end mt-5" style={{ height: "100%" }}>
                            <Link to="/registro">
                                <button className="btn btn-warning join-btn me-5">Create your account</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-warning join-btn">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
