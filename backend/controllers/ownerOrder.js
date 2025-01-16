
import artistSchema from "../models/Artist.js"

import userSchema from "../models/userModel.js"
import orderModel from "../models/orderModel.js"

const fetchOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      res.json({ success: true, data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching order details" });
    }
  };
  // Fetch user details by user ID
const fetchUserDetails = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await userSchema.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching user details" });
    }
  };

  // Fetch artist details by artist ID
const fetchArtistDetails = async (req, res) => {
    const { artistId } = req.params;
    try {
      const artist = await artistSchema.findById(artistId);
      if (!artist) {
        return res.status(404).json({ success: false, message: "Artist not found" });
      }
      res.json({ success: true, data: artist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching artist details" });
    }
  };
  
  

export {fetchOrderDetails,fetchUserDetails,fetchArtistDetails};