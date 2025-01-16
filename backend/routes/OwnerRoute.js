import express from 'express';
import { placeOrder,loginOwner,removeArt,artfetchlist,fetchArtist, fetchUser, fetchOrder } from '../controllers/ownerRegister.js';

const OwnerRouter = express.Router();

OwnerRouter.post('/register',placeOrder );
OwnerRouter.post('/login',loginOwner );
OwnerRouter.get('/list',artfetchlist);
OwnerRouter.post("/remove",removeArt);
OwnerRouter.get("/fetch",fetchArtist);
OwnerRouter.get("/user",fetchUser);
OwnerRouter.get("/order",fetchOrder);



export default OwnerRouter;