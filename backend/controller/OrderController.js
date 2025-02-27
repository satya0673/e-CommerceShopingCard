import Order from "../model/OrderModel.js";

export const addOrder = async (req, res) => {
    try {
        const { itemName, quantity, paymentMethod, receive, hotelId, hotelName, address, phoneNumber } = req.body;

        const userData = req.user;

        // Create a new order instance
        const newOrder = new Order({
            userId: userData._id.toString(),
            itemName,
            quantity,
            paymentMethod,
            receive,
            hotelId,
            address,
            phoneNumber,
            hotelName,
        });

        // Save the order to the database
        await newOrder.save();
        return res.status(201).json({ message: 'Order successfully', order: newOrder });
    } catch (error) {
        console.error('Error adding order:', error);
        return res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

// Controller to handle retrieving orders by user ID
export const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params; // Extract userId from route parameters

    try {
        const orders = await Order.find({ userId }); // Populate hotel details if needed
        return res.status(200).json(orders);

    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
    }
};
export const getOrdersByHotelId = async (req, res) => {
    const { hotelId } = req.params; // Extract hotelId from route parameters

    try {
        const orders = await Order.find({ hotelId }); // Populate user details if needed

        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
    }
};


export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.params;
    try {
        // Find the order by ID and update the status
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { receive: status },
            { new: true } // Return the updated order
        );

        // If the order is not found, return a 404 response
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Return the updated order in the response
        res.status(200).json("Order updated");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
