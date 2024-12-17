import express from 'express';
import { sendOTP, verifyOTP,resetPassword } from '../controllers/authController.js';

const authrouter = express.Router();

// Route to send OTP
authrouter.post('/send-otp', sendOTP);

// Route to verify OTP
authrouter.post('/verify-otp', verifyOTP);

authrouter.post('/reset-password', resetPassword);


export default authrouter;
