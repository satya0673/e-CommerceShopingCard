import mongoose from 'mongoose';

// Define the schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: String, // Assuming userId references a user document
        required: true,
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // Ensuring quantity is at least 1
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'Debit Card', 'Cash', 'PayPal'] // Example of payment methods
    },
    receive: {
        type: String,
        default: 'Pending' // Default value for receive
    },
    hotelName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    hotelId: {
        type: String,
        required: true,
    }
}, { timestamps: true });
// Create the model
const Order = mongoose.model('Order', orderSchema);

export default Order;
