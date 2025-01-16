import React, { useEffect, useState } from 'react';
import './Artist.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Artist = ({ url }) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch all artists from the backend
  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${url}/api/owner/fetch`);
      if (response.data.success) {
        setArtists(response.data.data);
      } else {
        toast.error('Failed to fetch artist data');
      }
    } catch (error) {
      toast.error('Error fetching artist data');
      console.error(error);
    }
  };

  // Fetch artworks of a specific artist
  const fetchArtistDetails = async (artistId) => {
    try {
      const response = await axios.get(`${url}/api/ownerartist/artworks/${artistId}`);
      if (response.data.success) {
        setSelectedArtist(response.data.artist);
        setArtworks(response.data.artworks);
        setShowModal(true);
      } else {
        toast.error('Failed to fetch artist details');
      }
    } catch (error) {
      toast.error('Error fetching artist details');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <div className="artist flex-col">
      <p>All Artists Information</p>
      <div className="artist-table">
        <div className="artist-table-header">
          <b>Profile Picture</b>
          <b>Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>Subscription Plan</b>
          <b>City</b>
        </div>
        {artists.map((artist, index) => (
          <div key={index} className="artist-table-row" onClick={() => fetchArtistDetails(artist._id)}>
            <img
              src={artist.profilePicture ? `${url}/images/` + artist.profilePicture : '/default-profile.png'}
              alt="Profile"
              className="artist-profile-picture"
            />
            <p>{artist.name}</p>
            <p>{artist.email}</p>
            <p>{artist.phone || 'N/A'}</p>
            <p>{artist.subscriptionPlan}</p>
            <p>{artist.customerAddress.city}</p>
          </div>
        ))}
      </div>

      {showModal && selectedArtist && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            <h3>Artist Details</h3>
            <p><strong>Name:</strong> {selectedArtist.name}</p>
            <p><strong>Email:</strong> {selectedArtist.email}</p>
            <p><strong>Phone:</strong> {selectedArtist.phone}</p>
            <p><strong>Subscription Plan:</strong> {selectedArtist.subscriptionPlan}</p>
            <p><strong>City:</strong> {selectedArtist.customerAddress.city}</p>
            <p><strong>Country:</strong> {selectedArtist.customerAddress.country}</p>

            <h3>Artworks</h3>
            <div className="artworks-grid">
              {artworks.map((art, index) => (
                <div key={index} className="artwork-card">
                  <img
                    src={`${url}/images/${art.image}`}
                    alt={art.name}
                    className="artwork-image"
                  />
                  <p><strong>Name:</strong> {art.name}</p>
                  <p><strong>Features:</strong> {art.features}</p>
                  <p><strong>Price:</strong> ₹{art.price}</p>
                  <p><strong>Category:</strong> {art.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artist;
