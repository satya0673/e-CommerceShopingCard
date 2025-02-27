// routes/cartRoutes.js
import express from 'express'
import { addToCart, deleteProduct, getCartItemsByUserId } from '../controller/CardController.js';
import { verifyToken } from '../middleware/Middleware.js';

const cardRouter = express.Router();

// Route to add an item to the cart
cardRouter.post('/add/:orderId', verifyToken, addToCart);
cardRouter.get('/getProduct/:userId', verifyToken, getCartItemsByUserId);
cardRouter.delete('/ordersDelete/:_id', verifyToken, deleteProduct);

export default cardRouter;
