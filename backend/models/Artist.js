import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    subscriptionPlan: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true,
    },
    customerAddress: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: 'IN', required: true },
    },
    isActive:{type:Boolean,default:false},
  },
  { timestamps: true }
);

export default mongoose.model('Artist', artistSchema);
