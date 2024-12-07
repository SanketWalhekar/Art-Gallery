import express from "express"
import { loginArtist } from "../controllers/loginController.js"

const LoginRouter=express.Router();

LoginRouter.post("/login",loginArtist)

export default LoginRouter;