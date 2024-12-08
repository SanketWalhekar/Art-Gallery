import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const url = "http://localhost:4000";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    navigate("/login");
  };

  const handleAddArtworkClick = () => {
  navigate("/home/add",{state:{url:url}}); 
  };

  const handleviewArtClick=()=>{
  navigate("/home/list",{state:{url:url}}); 

  }

  const handleorderClick = () => {
    navigate("/home/orders",{state:{url:url}}); 
    };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img
            src="https://via.placeholder.com/150"
            alt="Artist Logo"
            className="sidebar-logo-img"
          />
          <h1 className="sidebar-title">Artist Dashboard</h1>
        </div>
        <nav className="sidebar-menu">
          <div className="menu-item" onClick={handleAddArtworkClick}>
            <img src="https://via.placeholder.com/30" alt="Add Artwork" />
            <p>Add Artwork</p>
          </div>
          <div className="menu-item" onClick={handleviewArtClick}>
            <img src="https://via.placeholder.com/30" alt="View Artwork" />
            <p>View Artwork</p>
          </div>
          <div className="menu-item" onClick={handleorderClick}>
            <img src="https://via.placeholder.com/30" alt="Orders" />
            <p>Orders</p>
          </div>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h2>Welcome, Artist!</h2>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Artworks</h3>
            <p>25</p>
          </div>
          <div className="stat-card">
            <h3>Pending Orders</h3>
            <p>8</p>
          </div>
          <div className="stat-card">
            <h3>Total Earnings</h3>
            <p>$1,250</p>
          </div>
        </section>
        <section className="dashboard-activities">
          <h2>Dashboard Activities</h2>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Home;