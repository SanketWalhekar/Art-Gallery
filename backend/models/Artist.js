import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // Full Name
    email: { type: String, required: true, unique: true, trim: true }, // Email Address
    password: { type: String, required: true }, // Password
    phone: { type: String, trim: true ,default:null }, // Phone Number
    dob: { type: Date,default:null }, // Date of Birth
    bio: { type: String, trim: true, default:null }, // Bio/About
    socialLink: { // Social Media Links
      instagram: { type: String, trim: true ,default:null},
      twitter: { type: String, trim: true,default:null },
      linkedin: { type: String, trim: true ,default:null},
      portfolio: { type: String, trim: true ,default:null}, // Personal website/portfolio
    },
    profilePicture: { type: String, trim: true ,default:null}, // Profile Picture URL
    subscriptionPlan: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true,
    }, // Subscription Plan
    customerAddress: { // Address Information
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: 'IN', required: true },
    },
    isActive: { type: Boolean, default: false }, 
    otp: { type: String, required: false,  }, // OTP for validation
    otpExpiry: { type: Date, }, // OTP expiry time
    subscriptionExpiry: {type: Date, default:null}
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

export default mongoose.model('Artist', artistSchema);