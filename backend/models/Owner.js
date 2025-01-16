import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // Full Name
    email: { type: String, required: true, unique: true, trim: true }, // Email Address
    password: { type: String, required: true }, // Password
  },
  { timestamps: true } 
);

export default mongoose.model('Owner', ownerSchema);