import Artist from '../models/Artist.js';
import nodemailer from 'nodemailer';


// Generate a random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'fw19if002@gmail.com',
    pass: 'ypss wtpw zmvh wzvo', // Use environment variables
  },
});

// Function to send OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email exists
    const artist = await Artist.findOne({ email });
    if (!artist) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    // Generate OTP and expiry
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Save OTP and expiry in the artist record
    artist.otp = otp;
    artist.otpExpiry = otpExpiry;
    await artist.save();

    // Send OTP via email
    await transporter.sendMail({
      from: 'fw19if002@gmail.com', // Use sender's email dynamically
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
};

// Function to verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find artist by email
    const artist = await Artist.findOne({ email });
    if (!artist) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    // Validate OTP and expiry
    if (artist.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }
    if (artist.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // Clear OTP after successful verification
    artist.otp = undefined;
    artist.otpExpiry = undefined;
    await artist.save();

    res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP. Please try again.' });
  }
};

export const resetPassword = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the artist by email
      const artist = await Artist.findOne({ email });
      if (!artist) {
        return res.status(404).json({ message: 'Artist not found.' });
      }
      // Update the password in the database
      artist.password = password;
      await artist.save();
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Failed to reset password. Please try again.' });
    }
  };
