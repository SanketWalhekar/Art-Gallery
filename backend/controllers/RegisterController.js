import jwt from'jsonwebtoken';

import Artist from '../models/Artist.js';

const RegisterArtist=async (req, res) => {
    Artist.create(req.body)
      .then((employee) => res.json({ success: true, employee }))
      .catch((err) => {
        console.error(err);
        res.status(400).json({ success: false, message: 'Registration failed', error: err.message });
      });
  };
  export {RegisterArtist};
