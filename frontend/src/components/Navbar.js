import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext/noteContext";
import "../Styles/Navbar.css";

const Navbar = () => {
	const navigate = useNavigate();
	const { sendAlert } = useContext(noteContext);
	const [showNavbar, setShowNavbar] = useState(false);

	const handleLogout = () => {
		sendAlert("Confirm Logout?", "danger", true, "logout");
	};

	const handleUserDetails = async () => {
		navigate("/userdetails");
	};

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	const handleNavLinkClick = () => {
		setShowNavbar(false);
	};

	return (
		<nav className="nav-bar">
			<div className="nav-container">
				<div className="nav-logo">
					<h1>iNoteBook</h1>
				</div>
				<div className="nav-menu-icon" onClick={handleShowNavbar}>
					{showNavbar ? (
						<svg width="24" height="24" viewBox="0 0 24 24">
							<line x1="18" y1="6" x2="6" y2="18" stroke="#574c4c" strokeWidth="2" />
							<line x1="6" y1="6" x2="18" y2="18" stroke="#574c4c" strokeWidth="2" />
						</svg>
					) : (
						<svg width="24" height="24" viewBox="0 0 24 24">
							<rect width="24" height="4" rx="2" fill="#574c4c" />
							<rect width="24" height="4" rx="2" transform="translate(0 8)" fill="#574c4c" />
							<rect width="24" height="4" rx="2" transform="translate(0 16)" fill="#574c4c" />
						</svg>
					)}
				</div>
				<div className={`nav-elements-container ${showNavbar && "active"}`}>
					<ul>
						<li>
							<NavLink to="/" exact="true" onClick={handleNavLinkClick}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/about" onClick={handleNavLinkClick}>
								About
							</NavLink>
						</li>
						<li>
							<NavLink to="/getnotes" onClick={handleNavLinkClick}>
								Notes
							</NavLink>
						</li>
						{localStorage.getItem("auth-token") ? (
							<>
								<li>
									<button onClick={handleUserDetails} className="nav-btn">
										My Details
									</button>
								</li>
								<li>
									<button onClick={handleLogout} className="nav-btn nav-btn-danger">
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="/login" onClick={handleNavLinkClick}>
										Login
									</Link>
								</li>
								<li>
									<Link to="/signup" onClick={handleNavLinkClick}>
										Sign up
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;