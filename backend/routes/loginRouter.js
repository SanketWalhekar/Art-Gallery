import express from "express"
import { loginArtist,verifyOtp } from "../controllers/loginController.js"

const LoginRouter=express.Router();

LoginRouter.post("/login",loginArtist)

LoginRouter.post("/verifyotp",verifyOtp)

export default LoginRouter;