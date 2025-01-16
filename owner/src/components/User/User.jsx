import React, { useEffect, useState } from 'react';
import './User.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const User = ({ url }) => {
  const [users, setUsers] = useState([]);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${url}/api/owner/user`);
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error('Failed to fetch artist data');
      }
    } catch (error) {
      toast.error('Error fetching artist data');
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
          <b>Name</b>
          <b>Email</b>
        </div>
        {users.map((user, index) => (
          <div key={index} className="artist-table-row">
            
            <p>{user.name}</p>
            <p>{user.email}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
