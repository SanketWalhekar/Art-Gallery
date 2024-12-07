import express from "express"
import { RegisterArtist } from "../controllers/RegisterController.js"

const RegisterRouter=express.Router();

RegisterRouter.post("/register",RegisterArtist)

export default RegisterRouter;