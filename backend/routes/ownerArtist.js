import express from "express";
import { fetchArtistDetails } from "../controllers/ownerArtist.js";

const ownerArtist = express.Router();

ownerArtist.get("/artworks/:artistId", fetchArtistDetails);

export default ownerArtist;
