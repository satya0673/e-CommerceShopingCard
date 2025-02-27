import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  itemImageUrl: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  itemDesc: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
