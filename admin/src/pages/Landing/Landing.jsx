import React from "react";
import "./Landing.css";

const LandingPage = () => {
    return (
        <div className="artist-container">
          <header className="artist-header">
            <div className="logo">Artist<span className="highlight">Hub</span>.</div>
            <nav className="nav-links">
              
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </nav>
          </header>
    
          <main className="artist-main">
            <div className="text-content">
              <h1>Welcome to <span className="highlight">ArtistHub</span>.</h1>
              <h2>Unleash Creativity.</h2>
              <p>Explore and showcase your unique art with a modern and professional platform designed for artists.</p>
              <div className="button-container">
                <button className="primary-btn">Explore Gallery</button>
                <button className="secondary-btn">Get Started</button>
              </div>
            </div>
    
            <div className="image-content">
              <img src="https://images.unsplash.com/photo-1658303135227-fcdfb0dab396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGFydGlzdHxlbnwwfHwwfHx8MA%3D%3D" alt="Artists collaborating" />
            </div>
          </main>
        </div>
      );
    };
export default LandingPage;
