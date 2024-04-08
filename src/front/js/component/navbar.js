import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logoGame from "/src/front/img/logoSinFondo.png";
import podio from "/src/front/img/podio.png"
import ubic from "/src/front/img/ubic.png"
import diamante from "/src/front/img/diamante.png"

export const Navbar = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	const handleLogout = () => {
		localStorage.removeItem("jwt-token");
		setUser(null);
		navigate("/");
	};

	const handleLogin = () => {
		const token = localStorage.getItem("jwt-token");
		if (token) {
			setUser("denis9diaz@hotmail.com");
			navigate("/perfil");
		} else {
			navigate("/login");
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("jwt-token");
		if (token) {
			setUser("denis9diaz@hotmail.com");
		} else {
			setUser(null);
		}
	}, [localStorage.getItem("jwt-token")]);

	useEffect(() => {
		const token = localStorage.getItem("jwt-token");
		if (token) {
			fetch('/api/current-user', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(response => response.json())
			.then(data => {
				if (data.email) {
					setUser(data.email);
				}
			})
			.catch(error => {
				console.error('Error al obtener los detalles del usuario:', error);
			});
		} else {
			setUser(null);
		}
	}, [localStorage.getItem("jwt-token")]);

	return (
		<nav className="navbar navbar-custom pe-5">
			<div className="navbar-group-left">
				<div>
				<Link to="/">
					<img src={logoGame} alt="logo" className="imageLogo" />
				</Link>
				<p className="text-navbar ps-3">URBAN TREASURES</p>
				</div>
				<Link to="/lista-tesoros" className="navbar-brand h1" title="TREASURES">
					<div className="div-bar"><div className="div-icono"><img src={diamante} alt="logo" className="icon1 me-3" /></div><div className="div-texto"><span className="link-text">Treasures List</span></div></div>
				</Link>
				<Link to="/formulario-tesoro" className="navbar-brand h1" title="HIDE YOUR TREASURE">
					<div className="div-bar"><div className="div-icono"><img src={ubic} alt="logo" className="icon2 me-2" /></div><div className="div-texto"><span className="link-text">Hide Treasure</span></div></div>
				</Link>
				<Link to="/rankings" className="navbar-brand h1" title="RANKINGS">
					<div className="div-bar"><div className="div-icono"><img src={podio} alt="logo" className="icon3 me-3" /></div><div className="div-texto"><span className="link-text">Rankings</span></div></div>
				</Link>
			</div>
			<div className="navbar-group-right">
			{user ? (
				<div className="ml-auto dropdown">
					<button className="btn btn-link text-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
						<FontAwesomeIcon icon={faUser} className="me-1" /> {user}
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<li><Link className="dropdown-item" to="/perfil">My Profile</Link></li>
						<li><button className="dropdown-item logout" onClick={handleLogout}>Logout</button></li>
					</ul>
				</div>
			) : (
				<div className="ml-auto">
					<div style={{ display: "inline-block", marginRight: "10px" }}>
						<Link to="/registro" className="nav-link">
							<button className="btn btn-warning boton-navbar">Create your account</button>
						</Link>
					</div>
					<div style={{ display: "inline-block", marginRight: "10px" }}>
						<Link className="btn-link text-warning boton-navbar" to="/login" onClick={handleLogin}>Login</Link>
					</div>
				</div>
			)}
			</div>
		</nav>
	);
};
