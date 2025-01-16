import Owner from '../models/Owner.js';
import moment from "moment/moment.js";
import artModel from "../models/artModel.js";
import artistSchema from "../models/Artist.js"

import jwt from 'jsonwebtoken';
import fs from'fs'
import userSchema from "../models/userModel.js"
import orderModel from "../models/orderModel.js"

const placeOrder = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const currentTimestamp = moment();
    const isExistArtist = await Owner.findOne({ email });
    const currentTimestampp = moment().valueOf();

    if (!isExistArtist) {
      // Create a new owner if not already exists
      const newOwner = new Owner({
        name,
        email,
        password,
      });
      await newOwner.save();
      return res.json({ success: true, message: "Register Successfully" });
    } else {
      console.log("User Already Exists");
      return res.json({ success: false, message: "User Already Exists" });
    }

    
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error" });
  }
};

const loginOwner = async (req, res) => {
    const {email, password } = req.body;
    try {
        const existingOwner = await Owner.findOne({ email });
        if (!existingOwner) {
          return res.json({ success: false, message: 'User does not exist' });
        }
        if (existingOwner.password !== password) {
            return res.json({ success: false, message: 'Invalid password' });
          }
          const token = jwt.sign(
            { id: existingOwner._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token expires in 1 day
          );
      
          // Respond with success
          return res.json({
            success: true,
            message: 'Login successful',
            token,
          });
    } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Error occurred during login' });
        
    }
};

const artfetchlist=async(req,res)=>{
    

    try{
        const arts=await artModel.find({});
        res.json({success:true,data:arts})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

//remove art item
const removeArt=async(req,res)=>{
    try {
        const art=await artModel.findById(req.body.id);
        fs.unlink(`uploads/${art.image}`,()=>{

        })
        await artModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Art Removed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

        
    }

}

const fetchArtist=async(req,res)=>{
    

    try{
        const artist=await artistSchema.find({});
        res.json({success:true,data:artist})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

const fetchUser=async(req,res)=>{
    

    try{
        const user=await userSchema.find({});
        res.json({success:true,data:user})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

const fetchOrder=async(req,res)=>{
    

    try{
        const order=await orderModel.find({});
        res.json({success:true,data:order})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}


  
  

export { placeOrder,loginOwner,removeArt,artfetchlist,fetchArtist,fetchUser,fetchOrder};
