import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/LandingPage.css";


const LandingPage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('auth-token'))
        navigate("/home")
    })
    return (
        <div className="landing-app-container">
            <div className="landing-illustration">
                {/* Your SVG illustration code here */}
            </div>
            <div className="landing-max-container">
                <div className="landing-hero-section">
                    <div className="landing-text-center landing-section-header">
                        <h1 className="landing-title">
                            <span>The simplest way to</span>
                            <br />
                            <span>keep notes</span>
                        </h1>
                        <div className="landing-max-w-3xl mx-auto">
                            <p className="landing-description">
                                Effortlessly capture and organize your thoughts on iNoteBook, our versatile note-taking app. Seamlessly synchronize your ideas across all devices, ensuring that inspiration strikes without limits. Elevate your productivity and creativity with the ultimate note companion.
                            </p>
                            <div className="landing-button-container">
                                <a className="landing-btn" href="/signup">
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;



