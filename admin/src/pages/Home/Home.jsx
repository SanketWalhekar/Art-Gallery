import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { assets } from '../../assets/assets'


const Home = () => {
  const url = "http://localhost:4000";
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState("");

  const expiry = localStorage.getItem("planexpiry");
  const artistId = localStorage.getItem("artistId");

  useEffect(() => {
    // Fetch artist details
    const fetchArtist = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/artist/info/${artistId}`);
        setArtist(data); // ✅ Store artist data in state
      } catch (err) {
        setError("Error fetching artist data");
      }
    };

    if (artistId) {
      fetchArtist();
    } else {
      setError("Artist ID not found in localStorage");
    }
  }, [artistId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img
            src={
              artist?.profilePicture
                ? `http://localhost:4000/images/${artist.profilePicture}`
                : "https://via.placeholder.com/150"
            }
            alt="Artist Profile"
            className="sidebar-logo-img"
          />
          <h1 className="sidebar-title">Artist Dashboard</h1>
        </div>
        <nav className="sidebar-menu">
          {expiry === "false" ? (
            <>
              <div className="menu-item" onClick={() => navigate("/home/profile", { state: { url } })}>
                <img src={assets.profile} alt="Profile" />
                <p>Profile</p>
              </div>
              <div className="menu-item" onClick={() => navigate("/home/add", { state: { url } })}>
                <img src={assets.paint} alt="Add Artwork" />
                <p>Add Artwork</p>
              </div>
              <div className="menu-item" onClick={() => navigate("/home/list", { state: { url } })}>
                <img src={assets.search} alt="View Artwork" />
                <p>View Artwork</p>
              </div>
              <div className="menu-item" onClick={() => navigate("/home/orders", { state: { url } })}>
                <img src={assets.shipping} alt="Orders" />
                <p>Orders</p>
              </div>
            </>
          ) : (
            <div className="menu-item" onClick={() => navigate("/home/renew", { state: { url } })}>
              <img src="https://via.placeholder.com/30" alt="Renew" />
              <p>Renew</p>
            </div>
          )}
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
        {expiry === "true" && (
          <div style={{ color: "red", fontSize: "20px" }}>
            Your subscription has expired. Please renew to continue.
          </div>
        )}
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
