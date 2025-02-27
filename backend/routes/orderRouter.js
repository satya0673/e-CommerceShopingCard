import express from 'express';
import { addOrder, getOrdersByHotelId, getOrdersByUserId, updateOrderStatus } from '../controller/OrderController.js';
import { verifyToken } from '../middleware/Middleware.js';


const orderRouter = express.Router();

// Route to add a new order
orderRouter.post('/orders', verifyToken, addOrder);

// Route to get orders by user ID
orderRouter.get('/orders/:userId', verifyToken, getOrdersByUserId);
orderRouter.put('/ordersUpdate/:orderId/:status', verifyToken, updateOrderStatus);

orderRouter.get('/orders/hotel/:hotelId', getOrdersByHotelId);

export default orderRouter;