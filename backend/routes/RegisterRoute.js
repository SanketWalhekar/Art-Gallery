import express from 'express';
import { placeOrder, verifyOrder } from '../controllers/RegisterController.js';

const RegisterRouter = express.Router();

RegisterRouter.post('/create-checkout-session',placeOrder );

RegisterRouter.get('/payment-success', verifyOrder);

export default RegisterRouter;