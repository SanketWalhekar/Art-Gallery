import express from 'express';
import {fetchOrderDetails,fetchUserDetails,fetchArtistDetails } from '../controllers/ownerOrder.js';

const ownerOrder = express.Router();

ownerOrder.get('/fetchOrder/:orderId',fetchOrderDetails );
ownerOrder.get('/fetchUser/:userId',fetchUserDetails );
ownerOrder.get('/fetchArtist/:artistId',fetchArtistDetails);

export default ownerOrder;