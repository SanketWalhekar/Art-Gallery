import express from "express";
import { registerArtist, loginArtist, getArtistInfo } from "../controllers/artistController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const artistRouter = express.Router();

artistRouter.post("/register", registerArtist); 
artistRouter.post("/login", loginArtist);        // Public route for login
artistRouter.get("/info", authMiddleware, getArtistInfo); // Protected route to get artist info

export default artistRouter;

