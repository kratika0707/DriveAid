const express = require('express');
const router = express.Router();
const Mechanic = require('../model/mechanic'); // Assuming you have a Mechanic model
const Cart = require('../model/Cart'); 


exports.getcartitem = async(req,res)=>{
    try {
        const mechanicId = req.params.mechanicId;
        const cartItems = await Cart.find({ mechanicId }).select('productId quantity price');

        res.json({ cartItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.removeItemFromCart = async (req, res) => {
    const { mechanicId, productId } = req.params;

    try {
        // Find the cart item by mechanicId and productId and delete it
        await Cart.findOneAndDelete({ mechanicId, productId });

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};