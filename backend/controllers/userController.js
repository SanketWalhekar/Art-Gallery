import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fw19if002@gmail.com", 
            pass: "ypss wtpw zmvh wzvo", 
        },
    });

    const mailOptions = {
        from: "fw19if002@gmail.com", 
        to: email,
        subject: "Your OTP for Password Reset",
        text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    };

    return transporter.sendMail(mailOptions);
};

// Generate JWT Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

const sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User doesn't exist" });
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000);
      user.otp = otp;
      user.otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
      await user.save();
  
      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "fw19if002@gmail.com", 
            pass: "ypss wtpw zmvh wzvo", 
        },
      });
  
      await transporter.sendMail({
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
      });
  
      res.json({ success: true, message: 'OTP sent to email' });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'Error occurred while sending OTP' });
    }
  };
  
  const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User doesn't exist" });
      }
  
      if (user.otp !== parseInt(otp) || user.otpExpiry < Date.now()) {
        return res.json({ success: false, message: 'Invalid or expired OTP' });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
  
      res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'Error occurred while resetting password' });
    }
  };

export { loginUser, registerUser, sendOtp, resetPassword };
