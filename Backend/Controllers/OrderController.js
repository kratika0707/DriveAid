const express = require('express');
const router = express.Router();
const Order = require('../model/Order'); // Assuming you have an Order model set up
const Cart = require('../model/Cart')
exports.placeOrder = async (req, res) => {
    const { mechanicId, productIds, address, location, value, serviceId } = req.body;

    try {
        // Create a new order
        const newOrder = new Order({
            mechanicId,
            productIds,
            address,
            location,
            placedAt: Date.now(),
            value, 
            serviceId
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        await Cart.deleteMany({ mechanicId });
        // Send success response
        res.status(201).json({ message: 'Order placed successfully!', order: savedOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};


exports.serviceOrderHistory =async(req,res)=>{
    const { serviceId } = req.params;
    try {
      const orders = await Order.find({ serviceId: serviceId }); // Replace with your actual query
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }
  