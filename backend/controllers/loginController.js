import jwt from 'jsonwebtoken';

import Artist from '../models/Artist.js';

const loginArtist=async (req, res) => {
    const { email, password } = req.body;
  
    Artist.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            // Generate JWT Token
            const token = jwt.sign(
              { id: user._id, email: user.email },
              process.env.JWT_SECRET || 'default_secret_key', // Use environment variable or fallback
              { expiresIn: '1h' }
            );
            res.json({ success: true, message: 'Login successful', token });
          } else {
            res.json({ success: false, message: 'Incorrect password' });
          }
        } else {
          res.json({ success: false, message: 'User does not exist' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
      });
  };

  export {loginArtist};
