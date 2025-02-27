import CartModel from "../model/CardModel.js";

export const addToCart = async (req, res) => {

    const { hotelId, itemImageUrl, itemName, itemCategory, itemDesc, hotelName } = req.body;
    const { orderId } = req.params;
    const userData = req.user;


    try {
        const newCartItem = new CartModel({
            userId: userData?._id,
            hotelId,
            itemImageUrl,
            itemName,
            itemCategory,
            itemDesc,
            hotelName,
            orderId: orderId
        });

        await newCartItem.save();
        res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', });
    }
};

export const getCartItemsByUserId = async (req, res) => {
    const { userId } = req.params; // Get userId from the request parameters

    try {

        // Find all cart items for the specified user
        const cartItems = await CartModel.find({ userId });
        res.status(200).json(cartItems);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching cart items.' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params._id;

        // Check if product exists
        const product = await CartModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete the product
        await CartModel.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};