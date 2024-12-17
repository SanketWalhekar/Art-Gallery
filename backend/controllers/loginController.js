import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Artist from '../models/Artist.js';
import {sendEmail} from '../controllers/Common.js';



function generateOTP() {
  return crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
}

const loginArtist=async (req, res) => {
    const { email, password } = req.body;
  
    Artist.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            console.log(user)
            // Generate JWT Token
            const token = jwt.sign(
              { id: user._id, email: user.email },
              process.env.JWT_SECRET || 'default_secret_key', // Use environment variable or fallback
              { expiresIn: '1h' }
            );
            const id=user._id;
            const isActive=user.isActive;
            let isAuth=false;
              const otp = generateOTP();
              const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)
              // Send OTP via email
              const mailOptions = {
                from: "fw19if002@gmail.com",
                to: email,
                subject: "Your OTP Code",
                text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
              };

              const updateData={otp:otp};
              
              try{
                Artist.findOneAndUpdate(
                  { email: email },         
                  { $set: { otp: otp, otpExpiry: otpExpiry} },    
                  { new: true }             
                )
                .then(updatedArtist => {
                  
                  sendEmail(mailOptions);
                  

                })
                .catch(err => {
                  console.error('Error updating artist:', err);
                });
              }
              catch(err){
                res.json({success:false,message: 'sent OTP failed'});
              }
             
              res.json({ success: true, message: 'Login successful', token, id, isActive, isAuth });
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

  const verifyOtp= async (req,res)=>{
    const { email, otp } = req.body; // Expecting email and OTP from the request body

  try {
    // Find the artist by email
    const artist = await Artist.findOne({ email });
    console.log(artist);
    
    if (!artist) {
      return res.json({ success:false,message: 'Artist not found' });
    }

    // Check if the OTP matches
    if (artist.otp === otp) {
      // If OTP matches, mark the artist as verified or active
      artist.otp=undefined;
      artist.otpExpiry=undefined;
      await artist.save();

      res.json({ success:true, message: 'OTP verified successfully', isAuth:true });
    } else {
      res.json({success:false, message: 'Invalid OTP', expiry: artist.otpExpiry });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.json({ success:false,message: 'Internal server error', error });
  }
  }

  export {loginArtist,verifyOtp};