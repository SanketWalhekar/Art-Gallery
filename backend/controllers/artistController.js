import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Artist from "../models/Artist.js";

// Register Artist
export const registerArtist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingArtist = await Artist.findOne({ email });
    if (existingArtist) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique ID for the artist
    const uniqueId = `ART-${Date.now()}`;

    // Create and save the artist
    const newArtist = new Artist({ name, email, password: hashedPassword, uniqueId });
    await newArtist.save();

    res.status(201).json({ success: true, message: "Artist registered successfully", artistId: uniqueId });
  } catch (error) {
    console.error("Error registering artist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login Artist
export const loginArtist = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find artist by email
    const artist = await Artist.findOne({ email });
    if (!artist) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, artist.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: artist._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, artist: { name: artist.name, email: artist.email, uniqueId: artist.uniqueId } });
  } catch (error) {
    console.error("Error logging in artist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Artist Info
export const getArtistInfo = async (req, res) => {
  try {
    const artist = await Artist.findById(req.user.id);
    if (!artist) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }

    res.json({ success: true, artist });
  } catch (error) {
    console.error("Error fetching artist info:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
